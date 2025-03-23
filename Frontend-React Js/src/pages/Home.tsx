import { Link } from "react-router-dom";
import "../styles/styles.css";

const Home = () => {
  return (
    <div className="nav-container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Library Management System</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Our Library</h1>
        <p>
          Discover a world of knowledge. Manage books, borrow, and explore vast collections
          in one place.
        </p>
        <Link to="/register"><button>Get Started</button></Link>
      </div>

      {/* Library Features */}
      <div className="features-section">
        <h2>Why Choose Our Library?</h2>
        <div className="features">
          <div className="feature-box">
            <h3>Vast Collection</h3>
            <p>Access thousands of books across multiple genres and categories.</p>
          </div>
          <div className="feature-box">
            <h3>Easy Borrowing</h3>
            <p>Borrow books effortlessly and keep track of your reading history.</p>
          </div>
          <div className="feature-box">
            <h3>Online Management</h3>
            <p>Manage books, return dates, and reservations from anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
