package com.lms.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import com.lms.dto.UserRequestDTO;
import com.lms.dto.UserResponseDTO;

import com.lms.service.UserService;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequestDTO userRequest) {
        try {
            UserResponseDTO response = userService.register(userRequest);
            return ResponseEntity.ok("Registration successful : " + response.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
  
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserRequestDTO userRequest) {
        try {
            UserResponseDTO response = userService.login(userRequest);
            return ResponseEntity.ok(response);  
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Error: " + e.getMessage());
        }
    }
    
    
    
    
    
    
    
    
    
    
    /*
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserRequestDTO userRequest) {
        try {
            UserResponseDTO response = userService.register(userRequest);
            return ResponseEntity.ok("Registration successful : " + response.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
    */
    
/*
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequestDTO userRequest) {
        try {
            UserResponseDTO response = userService.login(userRequest);
            return ResponseEntity.ok("Login successful Welcome: " + response.getUsername());
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("Error: " + e.getMessage());
        }
    }
    */
    
    
}