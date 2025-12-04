import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import "./ownercss.css";
import AdminNavbar from "../component/admin_Navbar";

export default function OwnerDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const dashboardRes = await api.get("/owner/dashboard");
      setDashboardData(dashboardRes.data);

      const ratingsRes = await api.get("/owner/ratings");

      //  FIXED — always set array
      setRatings(ratingsRes.data.storeRatings || []);
      
    } catch (err) {
      console.error("OWNER DASHBOARD ERROR:", err);
      setError(err.response?.data?.message || "Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <div className="loading">Loading Dashboard...</div>;
  if (error) return <div className="error"> {error}</div>;
  if (!dashboardData) return <div className="error">No store associated with this account.</div>;

  return (
    <div>
    <AdminNavbar/>
    <div className="container">
      <h2>🏪 {dashboardData.storeName} Dashboard</h2>

      <div className="metrics-summary">
        <div className="metric-card">
          <h3>Average Rating</h3>
          <p className="rating-value">⭐ {dashboardData.averageRating?.toFixed(1) || "N/A"}</p>
        </div>

        <div className="metric-card">
          <h3>Total Ratings</h3>
          <p className="rating-count">{dashboardData.totalRatings}</p>
        </div>
      </div>

      <h3 className="section-title">Users Who Rated Your Store</h3>

      {ratings.length === 0 ? (
        <p>No ratings have been submitted yet.</p>
      ) : (
        <table className="ratings-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Rating Submitted</th>
              <th>Date Submitted</th>
            </tr>
          </thead>

          <tbody>
            {ratings.map((rating) => (
              <tr key={rating.id}>
                <td>{rating.user?.name}</td>
                <td>{rating.user?.email}</td>
                <td>{rating.ratingValue} / 5</td>
                <td>{new Date(rating.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
}
