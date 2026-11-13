package com.jobPortal.application_service.service;

import com.jobPortal.application_service.dto.ApplicationRequestDto;
import com.jobPortal.application_service.dto.ApplicationResponseDto;
import com.jobPortal.application_service.entity.Application;
import com.jobPortal.application_service.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicationService {

    private ApplicationRepository applicationRepository;

    public ApplicationService(ApplicationRepository applicationRepository) {
        this.applicationRepository = applicationRepository;
    }

    // 1. Apply for Job
    public ApplicationResponseDto applyForJob(
            ApplicationRequestDto requestDto) {

        Application application = new Application();

        application.setJobId(requestDto.getJobId());
        application.setApplicantId(requestDto.getApplicantId());
        application.setCoverLetter(requestDto.getCoverLetter());
        application.setResumeUrl(requestDto.getResumeUrl());
        application.setStatus("PENDING");

        Application savedApplication =
                applicationRepository.save(application);

        return mapToResponse(savedApplication);
    }

    // 2. Get All Applications
    public List<ApplicationResponseDto> getAllApplications() {

        List<Application> applications =
                applicationRepository.findAll();

        return applications.stream()
                .map(this::mapToResponse)
                .toList();
    }

    // 3. Update Application Status
    public ApplicationResponseDto updateApplicationStatus(
            Long id, String status) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found with id: " + id));

        application.setStatus(status);

        Application updatedApplication =
                applicationRepository.save(application);

        return mapToResponse(updatedApplication);
    }

    // 4. Delete Application
    public void deleteApplication(Long id) {

        Application application = applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Application not found with id: " + id));

        applicationRepository.delete(application);
    }

    // Convert Entity into Response DTO
    private ApplicationResponseDto mapToResponse(
            Application application) {

        ApplicationResponseDto response =
                new ApplicationResponseDto();

        response.setId(application.getId());
        response.setJobId(application.getJobId());
        response.setApplicantId(application.getApplicantId());
        response.setCoverLetter(application.getCoverLetter());
        response.setResumeUrl(application.getResumeUrl());
        response.setStatus(application.getStatus());
        response.setAppliedAt(application.getAppliedAt());

        return response;
    }
}
