package com.jobPortal.application_service.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ApplicationResponseDto {
    private Long id;

    private Long jobId;

    private Long applicantId;

    private String coverLetter;

    private String resumeUrl;

    private String status;

    private LocalDateTime appliedAt;
}
