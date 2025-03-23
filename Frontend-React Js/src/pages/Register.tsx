import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", user);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      console.error("Error registering:", error);
      alert("Registration failed");
    }
  };


  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form>
        <div className="input-group">
          <label>Username</label>
          <input type="text" name="username" placeholder="Enter username" onChange={handleChange} required />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter password" onChange={handleChange} required />
        </div>
        
        <button type="button" className="auth-btn" onClick={handleRegister}>Register</button>
      </form>

      <p className="switch-auth" onClick={() => navigate("/login")}>Already have an account? Login</p>
    </div>
  );
};

export default Register;
