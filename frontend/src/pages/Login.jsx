import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css.css"; 

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("userId", data.user.id);

      setSuccess(true);
      setError("");

      setTimeout(() => {
        const role = data.user.role;

        if (role === "admin") navigate("/admin");
        else if (role === "owner") navigate("/owner");
        else navigate("/user");
      }, 1000);
    } else {
      setError(data.message);
    }
  } catch (err) {
    setError("Server error");
  }
};




  return (
    <div className="login-body">
      <div className="login-container">
        <div className="login-card">
          {!success ? (
            <>
              <div className="login-header">
                <h2>Welcome Back</h2>
                <p>Sign in to your account</p>
              </div>

              <form className="login-form" onSubmit={handleLogin}>
                
                {/* Email */}
                <div className="form-group">
                  <div className="input-wrapper">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>Email</label>
                    <span className="focus-border"></span>
                  </div>
                </div>

                {/* Password */}
                <div className="form-group">
                  <div className="input-wrapper password-wrapper">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>

                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "👁️" : "🙈"}
                    </button>

                    <span className="focus-border"></span>
                  </div>
                </div>

                {error && <p className="error-message show">{error}</p>}

                <button type="submit" className="login-btn btn">
                  <span className="btn-text">Sign In</span>
                </button>
              </form>

              <div className="signup-link">
                <p>
                  Don’t have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/register");
                    }}
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div className="success-message show">
              <div className="success-icon">✓</div>
              <h3>Login Successful!</h3>
              <p>Redirecting to your dashboard...</p>
            </div>
          )}
        </div>
      </div>
            <p style={{
    color: "white",
    position: "absolute",
  
    bottom: "10px",
    left: "0",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 90px",
    fontSize: "13px",
    
  }}
><span>email: admin@gmail.com password: 123</span> <span>email: owner1@gmail.com password: 123</span> <span>email: user1@gmail.com password: 1234</span></p>
    </div>
  );
}
