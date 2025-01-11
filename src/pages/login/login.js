import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ login: null, signup: {} }); // Separate login and signup errors
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (isLogin) {
      setCredentials({ ...credentials, [name]: value });
      setErrors({ ...errors, login: null }); // Clear login error on input change
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, signup: {} }); // Clear signup errors on input change
    }
  };

  const validateSignup = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Invalid email address.";
    }
    if (
      formData.password.length < 8 ||
      !/[A-Z]/.test(formData.password) ||
      !/[a-z]/.test(formData.password) ||
      !/[0-9]/.test(formData.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters and include uppercase, lowercase, and a number.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }
    return newErrors;
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateSignup();
    if (Object.keys(validationErrors).length === 0) {
      // Store user in localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(formData);
      localStorage.setItem("users", JSON.stringify(users));

      // Navigate based on role
      if (formData.role === "Player") {
        navigate("/gameList");
      } else if (formData.role === "Gamer") {
        navigate("/game");
      }
    } else {
      setErrors({ ...errors, signup: validationErrors });
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      if (user.role === "Player") {
        navigate("/gameList");
      } else if (user.role === "Gamer") {
        navigate("/game");
      }
    } else {
      setErrors({ ...errors, login: "Invalid email or password." });
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Log In" : "Sign Up"}</h2>
      <form onSubmit={isLogin ? handleLoginSubmit : handleSignupSubmit}>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              {errors.signup.username && (
                <span className="error">{errors.signup.username}</span>
              )}
            </div>
          </>
        )}
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={isLogin ? credentials.email : formData.email}
            onChange={handleInputChange}
          />
          {isLogin && errors.login && (
            <span className="error">{errors.login}</span>
          )}
          {!isLogin && errors.signup.email && (
            <span className="error">{errors.signup.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={isLogin ? credentials.password : formData.password}
            onChange={handleInputChange}
          />
          {!isLogin && errors.signup.password && (
            <span className="error">{errors.signup.password}</span>
          )}
        </div>
        {!isLogin && (
          <>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              {errors.signup.confirmPassword && (
                <span className="error">{errors.signup.confirmPassword}</span>
              )}
            </div>
            <div className="form-group">
              <label>Role</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Player"
                    checked={formData.role === "Player"}
                    onChange={handleInputChange}
                  />
                  <div className="box">Player</div>
                </label>
                <label>
                  <input
                    type="radio"
                    name="role"
                    value="Gamer"
                    checked={formData.role === "Gamer"}
                    onChange={handleInputChange}
                  />
                  <div className="box">Gamer</div>
                </label>
              </div>
              {errors.signup.role && (
                <span className="error">{errors.signup.role}</span>
              )}
            </div>
          </>
        )}
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span className="switch-link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Sign Up" : "Log In"}
        </span>
      </p>
    </div>
  );
};

export default Auth;