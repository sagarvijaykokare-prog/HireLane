package com.jobPortal.job_service.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "company_name", nullable = false, length = 150)
    private String companyName;

    @Column(nullable = false, length = 150)
    private String location;

    @Column(name = "employment_type", nullable = false, length = 30)
    private String employmentType;

    @Column(name = "work_mode", nullable = false, length = 30)
    private String workMode;

    @Column(name = "experience_min", nullable = false)
    private Integer experienceMin;

    @Column(name = "experience_max", nullable = false)
    private Integer experienceMax;

    @Column(name = "salary_min", precision = 12, scale = 2)
    private BigDecimal salaryMin;

    @Column(name = "salary_max", precision = 12, scale = 2)
    private BigDecimal salaryMax;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(nullable = false, length = 30)
    private String status = "OPEN";

}
