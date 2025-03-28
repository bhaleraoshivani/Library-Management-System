package com.lms.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.model.Book;

public interface BookRepository extends JpaRepository<Book, UUID> {
}