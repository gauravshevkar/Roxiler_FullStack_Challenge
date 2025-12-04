import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig"; 
import "./css.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => {
    setError("");
    setSuccess("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => { 
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.password) {
      setError("⚠️ Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await api.post("/auth/register", form);

      if (res.status === 201 || res.status === 200) {
        setSuccess(" Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(" Registration failed with unexpected response.");
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || " Server error. Try again later.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const currentMessage = success || error;

  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Create Account</h2>
            <p>Register to continue</p>
          </div>

          <form className="login-form" onSubmit={handleRegister}>
            {/* Name */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  name="name" 
                  value={form.name}
                  onChange={handleChange}
                />
                <label>Name</label>
                <span className="focus-border"></span>
              </div>
            </div>

            {/* Email */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="email"
                  required
                  name="email" 
                  value={form.email}
                  onChange={handleChange}
                />
                <label>Email</label>
                <span className="focus-border"></span>
              </div>
            </div>

            {/* Address */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  required
                  name="address" 
                  value={form.address}
                  onChange={handleChange}
                />
                <label>Address</label>
                <span className="focus-border"></span>
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="password"
                  required
                  name="password" 
                  value={form.password}
                  onChange={handleChange}
                />
                <label>Password</label>
                <span className="focus-border"></span>
              </div>
            </div>

            {/* Display message (success or error) */}
            {currentMessage && (
              <p
                className={`success-message show ${error ? "error-message" : ""}`}
              >
                {currentMessage}
              </p>
            )}

            <button type="submit" className="login-btn btn" disabled={loading}>
              <span className="btn-text">
                {loading ? "Registering..." : "Register"}
              </span>
            </button>
          </form>

          <div className="signup-link">
            <p>
              Already have an account?{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}