import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";
import Stats from "../Stats/Stats";
import ProgressChart from "../ProgressChart/ProgressChart";

const AnalyticsProvider = ({ timeframe = "week" }) => {
  const { userData } = useContext(UserDataContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const storagedUserData = JSON.parse(
          sessionStorage.getItem("sessionedUserData")
        );
        const userId = userData?._id || storagedUserData?._id;
        if (userId) {
          // Single request for both components
          const response = await axios.get(`/api/user/analytics/${userId}`);
          setAnalytics(response.data);
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [userData]);

  if (loading) {
    return (
      <div className="analytics-loading">
        <div className="progress-chart">
          <div className="chart-header">
            <h3>Progress Overview</h3>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-provider">
      {/* Pass analytics data to Stats to prevent separate API call */}
      <Stats analyticsData={analytics} />
      {/* Pass analytics data to ProgressChart to prevent separate API call */}
      <ProgressChart analyticsData={analytics} timeframe={timeframe} />
    </div>
  );
};

export default AnalyticsProvider;