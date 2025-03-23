import React, { useState } from "react";
import axios from "axios";
import "../styles/styles.css";
import { useNavigate } from "react-router-dom";

const AddBook: React.FC = () => {
  const [book, setBook] = useState({ title: "", author: "", publishedYear: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/books/add", book);
      alert("Book added successfully");
      setBook({ title: "", author: "", publishedYear: "" }); // Clear input fields
      navigate("/admin-dashboard/books"); // Navigate to Book List page
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input type="text" name="title" placeholder="Enter book title" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Author</label>
          <input type="text" name="author" placeholder="Enter author name" onChange={handleChange} required />
        </div>

        <div className="input-group">
          <label>Published Year</label>
          <input type="number" name="publishedYear" placeholder="Enter year of publication" onChange={handleChange} required />
        </div>

        <button type="submit" className="submit-btn">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
