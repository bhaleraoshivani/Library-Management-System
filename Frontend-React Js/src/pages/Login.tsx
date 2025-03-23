import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await loginUser(username, password);
      authContext?.login(response.data.token, response.data.role);

      if (response.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form>
        <div className="input-group">
          <label>Username</label>
          <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        
        <button type="button" className="auth-btn" onClick={handleLogin}>Login</button>
      </form>

      <p className="switch-auth" onClick={() => navigate("/register")}>New here? Register</p>
    </div>
  );
};


export default Login;
