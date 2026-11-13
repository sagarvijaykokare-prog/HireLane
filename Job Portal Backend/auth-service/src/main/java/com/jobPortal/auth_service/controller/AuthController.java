package com.jobPortal.auth_service.controller;

import com.jobPortal.auth_service.dto.LoginRequestDto;
import com.jobPortal.auth_service.dto.LoginResponseDto;
import com.jobPortal.auth_service.service.JWTService;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authenticationManager ;
    private JWTService jwtService ;
    private final ResourceLoader resourceLoader ;

    public AuthController(AuthenticationManager authenticationManager , JWTService jwtService , ResourceLoader resourceLoader){
        this.authenticationManager = authenticationManager ;
        this.jwtService = jwtService ;
        this.resourceLoader = resourceLoader ;
    }

    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginRequestDto loginRequestDto){
        Authentication authentication_request = UsernamePasswordAuthenticationToken.unauthenticated(
                loginRequestDto.getEmail(),
                loginRequestDto.getPassword()
        );
        Authentication authentication = authenticationManager.authenticate(authentication_request) ;
        String token = jwtService.generateToken(authentication);
        return  new LoginResponseDto(token);
    }
}
