import React, { useState, useEffect, useContext } from "react";
import "./Stats.css";
import Heart from "../../assets/img/Icons/herz.svg";
import Headphones from "../../assets/img/Icons/headphones.svg";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const Stats = ({ analyticsData }) => {
  const { userData } = useContext(UserDataContext);
  const [stats, setStats] = useState({
    totalMinutes: 0,
    totalSessions: 0,
    currentStreak: 0,
    favorites: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If analyticsData is provided by parent (from ProgressChart), use it
    if (analyticsData) {
      setStats({
        totalMinutes: analyticsData.totalMinutes || 0,
        totalSessions: analyticsData.totalSessions || 0,
        currentStreak: analyticsData.currentStreak || 0,
        favorites: userData?.videos?.length || 0
      });
      setLoading(false);
      return;
    }

    // Otherwise, fetch stats separately (fallback)
    const fetchStats = async () => {
      try {
        const storagedUserData = JSON.parse(
          sessionStorage.getItem("sessionedUserData")
        );
        const userId = userData?._id || storagedUserData?._id;
        if (userId) {
          const response = await axios.get(`/api/user/stats/${userId}`);
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to showing basic stats if API fails
        const storagedUserData = JSON.parse(
          sessionStorage.getItem("sessionedUserData")
        );
        setStats({
          totalMinutes: 0,
          totalSessions: 0,
          currentStreak: 0,
          favorites: userData?.videos?.length || storagedUserData?.videos?.length || 0
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userData, analyticsData]);

  if (loading) {
    return (
      <article className="statsContainer">
        <div className="stats">
          <img src={Heart} alt="Heart"></img>
          <p className="stats">Loading...</p>
        </div>
        <div className="stats">
          <img src={Headphones} alt="Headphones"></img>
          <p>Loading...</p>
        </div>
      </article>
    );
  }

  return (
    <article className="statsContainer">
      <div className="stats">
        <img src={Heart} alt="Heart"></img>
        <p className="stats">{stats.favorites} Favorites</p>
      </div>
      <div className="stats">
        <img src={Headphones} alt="Headphones"></img>
        <p>{stats.totalMinutes} Minutes</p>
      </div>
    </article>
  );
};

export default Stats;
