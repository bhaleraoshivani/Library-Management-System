import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  return (
    <div className="nav-container">
      {/* Navbar */}
      <nav className="navbar">
      <h2>Welcome Admin Dashboard</h2>
        <ul>
          <li><Link to="/admin-dashboard">Home</Link></li>
          <li><Link to="/admin-dashboard/books">Books</Link></li>
          <li><Link to="/admin-dashboard/add-book">Add Book</Link></li>
          <li><Link to="/">Logout</Link></li>
        </ul>
      </nav>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;


