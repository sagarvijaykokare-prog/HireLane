package com.jobPortal.auth_service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserRequestDto {
    @NotBlank(message = "Email is required ")
    @Email(message = "Enter the valid email ")
    private String email ;

    @NotBlank(message = "Password is required")
    @Size(min = 4 , message = "Password must be at least 4 character ")
    private String password ;
}
