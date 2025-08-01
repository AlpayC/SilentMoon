import React, { useState, useEffect, useContext } from "react";
import "./ProgressChart.css";
import { UserDataContext } from "../../context/UserDataContext";
import axios from "axios";

const ProgressChart = ({ timeframe = "week", analyticsData }) => {
  const { userData } = useContext(UserDataContext);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If analyticsData is provided by parent, use it
    if (analyticsData) {
      setAnalytics(analyticsData);
      setLoading(false);
      return;
    }

    // Otherwise, fetch analytics separately (fallback)
    const fetchAnalytics = async () => {
      try {
        const storagedUserData = JSON.parse(
          sessionStorage.getItem("sessionedUserData")
        );
        const userId = userData?._id || storagedUserData?._id;
        if (userId) {
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
  }, [userData, analyticsData]);

  if (loading) {
    return (
      <div className="progress-chart">
        <div className="chart-header">
          <h3>Progress Overview</h3>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="progress-chart">
        <div className="chart-header">
          <h3>Progress Overview</h3>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const stats = timeframe === "week" ? analytics.weekStats : analytics.monthStats;
  const timeframeName = timeframe === "week" ? "This Week" : "This Month";

  return (
    <div className="progress-chart">
      <div className="chart-header">
        <h3>Progress Overview</h3>
        <span className="timeframe">{timeframeName}</span>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.sessions}</div>
          <div className="stat-label">Sessions</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{stats.minutes}</div>
          <div className="stat-label">Minutes</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{analytics.currentStreak}</div>
          <div className="stat-label">Day Streak</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">{analytics.averageSessionLength}</div>
          <div className="stat-label">Avg Session</div>
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-label">
          <span>Weekly Progress</span>
          <span>{stats.minutes} / 150 min</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${Math.min((stats.minutes / 150) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {analytics.recentSessions && analytics.recentSessions.length > 0 && (
        <div className="recent-sessions">
          <h4>Recent Sessions</h4>
          <div className="sessions-list">
            {analytics.recentSessions.slice(0, 3).map((session, index) => (
              <div key={index} className="session-item">
                <div className="session-info">
                  <span className="session-title">
                    {session.contentTitle || `${session.type} Session`}
                  </span>
                  <span className="session-duration">{session.duration} min</span>
                </div>
                <div className="session-date">
                  {new Date(session.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;