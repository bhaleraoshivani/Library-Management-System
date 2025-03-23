package com.lms.service;


import com.lms.dto.UserRequestDTO;
import com.lms.dto.UserResponseDTO;



public interface UserService {
    UserResponseDTO register(UserRequestDTO userRequest);
    UserResponseDTO login(UserRequestDTO userRequest);
}