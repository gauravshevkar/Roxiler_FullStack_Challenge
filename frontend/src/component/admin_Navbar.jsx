import React from "react";
import { useNavigate } from "react-router-dom";
import "./adminnav.css"; 
import api from "../api/axiosConfig"; 

export default function AdminNavbar() {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await api.post("/auth/logout"); 
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        navigate("/login");
      }
    }
  };


  return (
    <header className="admin-navbar">
      <div className="navbar-logo" onClick={() => handleNavigation("/admin")}>
        My Application
      </div>


    

      {/* Logout Button */}
      <button 
        className="nav-logout-btn" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </header>
  );
}