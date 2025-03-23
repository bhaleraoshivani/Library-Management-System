import React, { useEffect, useState } from "react";
import { getBooks } from "../services/bookService";
import "../styles/styles.css";


import bookImage1 from "../images/book1.png";
import bookImage2 from "../images/book2.png";
import bookImage4 from "../images/book4.png";
import bookImage5 from "../images/book5.jpg";


interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  status: "AVAILABLE" | "BORROWED";
}

// Array of book images to be randomly selected
const bookImages = [bookImage1, bookImage2, bookImage4,bookImage5];

const getRandomImage = () => {
  return bookImages[Math.floor(Math.random() * bookImages.length)];
};

const UserBookList: React.FC = () => {
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

  return (
    <div className="book-card-container">
      <h1>Books List</h1>
      <div className="book-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={getRandomImage()} alt="Book Cover" className="book-image" />
            <div className="book-details">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Published Year:</strong> {book.publishedYear}</p>
              <p><strong>Status:</strong> 
                <span className={book.status === "AVAILABLE" ? "status-available" : "status-borrowed"}>
                  {book.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookList;
