import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook";
import BookList from "./pages/BookList";
import EditBook from "./pages/EditBook";
import UserBookList from "./pages/UserBookList";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard with Nested Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route path="books" element={<BookList />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="edit-book/:id" element={<EditBook />} />
          </Route>


          <Route path="/user-dashboard" element={<UserDashboard />}>
            <Route path="books" element={<UserBookList />} />
          </Route>


        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
