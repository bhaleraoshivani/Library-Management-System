import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBook: React.FC = () => {
  const { id } = useParams(); // Get book ID from the URL
  const navigate = useNavigate(); // For redirection

  const [book, setBook] = useState({ title: "", author: "", publishedYear: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch book data when component mounts
  useEffect(() => {
    const fetchBook = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            setError("Unauthorized. Please log in again.");
            return;
          }
      
          const response = await axios.get(`http://localhost:8080/api/books/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,  
              "Content-Type": "application/json",
            },
          });
      
          setBook(response.data);
          setLoading(false);
        } catch (err) {
          setError("Failed to fetch book details.");
          console.error("Error fetching book:", err);
          setLoading(false);
        }
      };
      
    fetchBook();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Handle form submission for updating the book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:8080/api/books/${id}`, book, {
        headers: token ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } : { "Content-Type": "application/json" },
      });

      alert("Book updated successfully!");
      navigate("/admin-dashboard/books"); 
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>
          <input type="text" name="title" value={book.title} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Author</label>
          <input type="text" name="author" value={book.author} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Published Year</label>
          <input type="number" name="publishedYear" value={book.publishedYear} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Update Book</button>
      </form>
    </div>
  );
};

export default EditBook;
