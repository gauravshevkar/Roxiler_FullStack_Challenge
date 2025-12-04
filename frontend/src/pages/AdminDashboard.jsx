import React, { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./admincss.css";
import AdminNavbar from "../component/admin_Navbar";

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch Admin Dashboard Summary Data
  const fetchDashboardMetrics = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/admin/dashboard");

      setMetrics({
        totalUsers: res.data.totalUsers,
        totalStores: res.data.totalStores,
        totalRatings: res.data.totalRatings,
      });
    } catch (err) {
      console.error("Admin Dashboard Error:", err);
      setError(err.response?.data?.message || "Failed to load admin metrics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardMetrics();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-loading">
        ⏳ Loading Admin Dashboard...
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="dashboard-error">
        ❌ {error}
      </div>
    );
  }

  return (
    <div>
      <AdminNavbar/>

    <div className="admin-container">

      {/* 🔹 METRICS SUMMARY */}
      <div className="metrics-summary">
        <div
          className="metric-card users"
          onClick={() => navigate("/admin/users")}
        >
          <h3>Total Users</h3>
          <p className="metric-value">{metrics.totalUsers}</p>
          <span>View Users →</span>
        </div>

        <div
          className="metric-card stores"
          onClick={() => navigate("/admin/stores")}
        >
          <h3>Total Stores</h3>
          <p className="metric-value">{metrics.totalStores}</p>
          <span>View Stores →</span>
        </div>

        <div className="metric-card ratings">
          <h3>Total Ratings</h3>
          <p className="metric-value">{metrics.totalRatings}</p>
        </div>
      </div>

      {/* 🔹 ADMIN ACTIONS */}
      <h3 className="section-title">Quick Actions</h3>

      <div className="action-buttons">
        <button
          className="btn-action primary"
          onClick={() => navigate("/admin/add_users")}
        >
          ➕ Add New User
        </button>

        <button
          className="btn-action secondary"
          onClick={() => navigate("/admin/add_storesowner")}
        >
          ➕ Add New owner
        </button>
         <button
          className="btn-action secondary"
          onClick={() => navigate("/admin/add_stores")}
        >
          ➕ Add New Store
        </button>
         <button
          className="btn-action secondary"
          onClick={() => navigate("/admin/add_admin")}
        >
          ➕ Add New Admin
        </button>
      </div>
    </div>
    </div>
  );
  
}
