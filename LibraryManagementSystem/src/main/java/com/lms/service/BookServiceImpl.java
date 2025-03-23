package com.lms.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.lms.enums.BookStatus;
import com.lms.model.Book;
import com.lms.repository.BookRepository;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Book getBookById(UUID id) {
        return bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Book not found"));
    }

    @Override
    public Book addBook(Book book) {
        book.setCreatedAt(LocalDateTime.now().toString());
        book.setUpdatedAt(LocalDateTime.now().toString());
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(UUID id, Book book) {
        Book existingBook = getBookById(id);
        existingBook.setTitle(book.getTitle());
        existingBook.setAuthor(book.getAuthor());
        existingBook.setPublishedYear(book.getPublishedYear());
        existingBook.setUpdatedAt(LocalDateTime.now().toString());
        return bookRepository.save(existingBook);
    }

    @Override
    public void deleteBook(UUID id) {
        bookRepository.deleteById(id);
    }

    @Override
    public Book updateBookStatus(UUID id, String status) {
        Book book = getBookById(id);

        // Debugging: Log the current status before updating
        System.out.println("Before Update: Book ID = " + id + ", Current Status = " + book.getStatus());

        try {
            book.setStatus(BookStatus.valueOf(status.toUpperCase())); // Convert status to ENUM
            book.setUpdatedAt(LocalDateTime.now().toString());
            Book savedBook = bookRepository.save(book);

            // Debugging: Log the new status after updating
            System.out.println("After Update: Book ID = " + id + ", New Status = " + savedBook.getStatus());

            return savedBook;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + status);
        }
    }
}