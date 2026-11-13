package com.jobPortal.auth_service.controller;

import com.jobPortal.auth_service.dto.UserRequestDto;
import com.jobPortal.auth_service.dto.UserResponseDto;
import com.jobPortal.auth_service.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AuthService authService;

    public AdminController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<UserResponseDto> createAdmin(
            @RequestBody UserRequestDto userRequestDto) {

        UserResponseDto response =
                authService.createAdmin(userRequestDto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
