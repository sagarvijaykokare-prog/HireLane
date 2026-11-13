package com.jobPortal.profile_service.dto;

import lombok.Data;

@Data
public class ProfileRequestDto {
    private String fullName;
    private String phone;
    private String location;
    private String bio;
    private String skills;
    private Integer experienceYears;
    private String resumeUrl;
}
