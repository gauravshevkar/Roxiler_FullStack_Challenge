import React, { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./add_store.css";

export default function AddAdmin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
    role: "admin",  
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/admin/users/add", form);
      setMessage("✅ Admin created successfully!");

      setTimeout(() => navigate("/admin"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Failed to add admin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Add New Admin</h2>

      <form className="add-user-form" onSubmit={handleSubmit}>
        
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Address</label>
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {/* FIXED ROLE */}
        <input type="hidden" name="role" value="admin" />

        {message && <p className="msg">{message}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Admin"}
        </button>
      </form>
    </div>
  );
}
