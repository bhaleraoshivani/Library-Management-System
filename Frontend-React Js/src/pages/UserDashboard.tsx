import React from "react";
import { Link, Outlet } from "react-router-dom";

const UserDashboard: React.FC = () => {
  return (
    <div className="nav-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Welcome User Dashboard</h2>
        <ul>
          <li><Link to="/user-dashboard">Home</Link></li>
          <li><Link to="/user-dashboard/books">Books</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
