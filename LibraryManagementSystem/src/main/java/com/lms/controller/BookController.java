package com.lms.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.model.Book;
import com.lms.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")

public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable("id") UUID id) {
        return bookService.getBookById(id);
    }

    @PostMapping("/add")
    public Book addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @PutMapping("/{id}")
    public Book updateBook(@PathVariable("id") UUID id, @RequestBody Book book) {
        return bookService.updateBook(id, book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable("id") UUID id) {
        System.out.println("Deleting book with ID: " + id);
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
    

    @PatchMapping("/{id}/status")
    public ResponseEntity<Book> updateBookStatus(@PathVariable("id") UUID id, @RequestBody Map<String, String> requestBody) {
        String status = requestBody.get("status");

        System.out.println("Received request to update status: Book ID = " + id + ", New Status = " + status);

        if (status == null || (!status.equals("AVAILABLE") && !status.equals("BORROWED"))) {
            System.out.println("Invalid status received: " + status);
            return ResponseEntity.badRequest().body(null);
        }

        Book updatedBook = bookService.updateBookStatus(id, status);

        System.out.println("Updated Book Status Successfully: " + updatedBook.getStatus());

        return ResponseEntity.ok(updatedBook);
    }

}

