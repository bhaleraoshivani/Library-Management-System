# Library Management System with Security

This project is a Library Management System that includes authentication, role-based access control (RBAC), and CRUD operations for managing books.

## Features

### Backend (Spring Boot with JWT Authentication)
- **User Authentication**
  - Register and login with JWT-based authentication.
  - Secure API endpoints using JWT.
  - Use BCrypt for password hashing.

- **Role-Based Access Control**
  - Users can view books.
  - Admins can add, edit, and delete books.

- **Book Management (CRUD Operations)**
  - `GET /books` - Fetch all books (authenticated users only).
  - `POST /books` - Add a book (admin only).
  - `PUT /books/:id` - Update a book (admin only).
  - `DELETE /books/:id` - Delete a book (admin only).
  - `PATCH /books/:id/status` - Update book status (borrowed/available).

### Frontend (React.js with TypeScript)
- **Authentication**
  - Login page with JWT authentication.
  - Store JWT securely in localStorage or HTTP-only cookies.

- **Role-Based UI**
  - Show books list for authenticated users.
  - Allow admins to add, edit, and delete books.

- **State Management**
  - Use Context API or Redux for managing authentication state.

## Tech Stack

- **Backend:** Java Spring Boot, Spring Security, JPA, MySQL, JWT
- **Frontend:** React.js (TypeScript), CSS
- **Database:** MySQL
- **Security:** Password hashing with BCrypt, JWT authentication

## Setup Instructions

### Backend Setup (Spring Boot)
1.Create a new Spring Boot project with dependencies:
Spring Web
Spring Security
Spring Data JPA
MySQL Driver
Lombok
JWT (jjwt)

2. Configure MySQL database in application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/library
spring.datasource.username=root
spring.datasource.password=yourpassword

3. Run the backend:




### Frontend Setup (React.js with TypeScript)

npx create-react-app library-frontend --template typescript

npm install axios react-router-dom jwt-decode
