package com.jobPortal.job_service.dto;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobCreateDto {

    private String title;

    private String description;

    private String companyName;

    private String location;

    private String employmentType;

    private String workMode;

    private Integer experienceMin;

    private Integer experienceMax;

    private BigDecimal salaryMin;

    private BigDecimal salaryMax;

    private String skills;

    private String status;

}
