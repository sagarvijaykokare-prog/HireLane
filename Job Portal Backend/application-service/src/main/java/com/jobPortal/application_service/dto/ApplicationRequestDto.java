package com.jobPortal.application_service.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationRequestDto {

    private Long jobId;

    private Long applicantId;

    private String coverLetter;

    private String resumeUrl;

}
