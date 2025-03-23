
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";


const Navbar: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    authContext?.logout();
    navigate("/login");
  };

  return (
    <nav>
      <h2>Library System</h2>
      {authContext?.token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login</button>
      )}
    </nav>
  );
};

export default Navbar;
