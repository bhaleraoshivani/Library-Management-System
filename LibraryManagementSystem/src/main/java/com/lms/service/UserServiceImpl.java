package com.lms.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lms.dto.UserRequestDTO;
import com.lms.dto.UserResponseDTO;
import com.lms.enums.Role;
import com.lms.jwt.JwtUtil;
import com.lms.model.User;
import com.lms.repository.UserRepository;



@Service
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public UserResponseDTO register(UserRequestDTO userRequest) {
        // Check if the username already exists
        if (userRepository.findByUsername(userRequest.getUsername()).isPresent()) {
            throw new RuntimeException("Username already exists. Please choose a different username.");
        }

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));

        // Set role based on user input, default to USER if null
        Role role = (userRequest.getRole() != null) ? Role.valueOf(userRequest.getRole().toUpperCase()) : Role.USER;
        user.setRole(role);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user.getUsername());
        return new UserResponseDTO(user.getUsername(), user.getRole().name(), token);
    }
    
    @Override
    public UserResponseDTO login(UserRequestDTO userRequest) {
        Optional<User> userOptional = userRepository.findByUsername(userRequest.getUsername());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(userRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(user.getUsername());
                return new UserResponseDTO(user.getUsername(), user.getRole().name(), token);
            }
        }
        throw new RuntimeException("Invalid Credentials");
    }
}