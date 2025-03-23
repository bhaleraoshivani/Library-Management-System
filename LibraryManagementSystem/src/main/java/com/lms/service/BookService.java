package com.lms.service;

import java.util.List;
import java.util.UUID;

import com.lms.model.Book;

public interface BookService {
    List<Book> getAllBooks();
    Book getBookById(UUID id);
    Book addBook(Book book);
    Book updateBook(UUID id, Book book);
    void deleteBook(UUID id);
    Book updateBookStatus(UUID id, String status);
}
