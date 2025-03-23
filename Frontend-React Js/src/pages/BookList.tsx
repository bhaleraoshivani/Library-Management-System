import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook, updateBookStatus } from "../services/bookService";
import "../styles/styles.css";

interface Book {
  id: string;
  title: string;
  author: string;
  status: "AVAILABLE" | "BORROWED";
  publishedYear: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const bookData = await getBooks();
      setBooks(bookData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id);
      setBooks(books.filter(book => book.id !== id));
      alert("Book Deleted successfully!");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const handleStatusToggle = async (id: string, newStatus: "AVAILABLE" | "BORROWED") => {
    try {
      const updatedBook = await updateBookStatus(id, newStatus);
      setBooks(books.map(book => (book.id === id ? { ...book, status: updatedBook.status } : book)));
      console.log("Updated book status in frontend:", updatedBook);
    } catch (error) {
      console.error("Error updating book status:", error);
    }
};

  return (
    <div className="booklist-container">
      <h2>Book List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author Name</th>
            <th>PublishYear</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedYear}</td>
              <td>{book.status}</td>
              <td>
                <Link to={`/admin-dashboard/edit-book/${book.id}`} className="edit-btn">Edit</Link>
                <button onClick={() => handleDelete(book.id)} className="delete-btn">Delete</button>
              </td>
              <td>
                <select
                  value={book.status}
                  onChange={(e) => handleStatusToggle(book.id, e.target.value as "AVAILABLE" | "BORROWED")}
                  className="status-select"
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="BORROWED">BORROWED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
