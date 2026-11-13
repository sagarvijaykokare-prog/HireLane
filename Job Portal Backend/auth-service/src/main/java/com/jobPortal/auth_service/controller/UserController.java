package com.jobPortal.auth_service.controller;

import com.jobPortal.auth_service.dto.UserRequestDto;
import com.jobPortal.auth_service.dto.UserResponseDto;
import com.jobPortal.auth_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private AuthService authService ;

    public  UserController(AuthService authService){
        this.authService = authService ;
    }

    @GetMapping("/message")
    public ResponseEntity<String> message() {
        return ResponseEntity.ok("This is auth service");
    }

    @PostMapping("/rejstar")
    public UserResponseDto rejstar(@RequestBody UserRequestDto userRequestDto){
        return authService.rejstar(userRequestDto);
    }
}
