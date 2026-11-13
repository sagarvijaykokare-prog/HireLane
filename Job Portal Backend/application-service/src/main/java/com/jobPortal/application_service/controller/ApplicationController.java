package com.jobPortal.application_service.controller;

import com.jobPortal.application_service.dto.ApplicationRequestDto;
import com.jobPortal.application_service.dto.ApplicationResponseDto;
import com.jobPortal.application_service.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/application")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }


    @PostMapping("/apply")
    public ResponseEntity<ApplicationResponseDto> applyForJob(
            @RequestBody ApplicationRequestDto requestDto) {

        ApplicationResponseDto response =
                applicationService.applyForJob(requestDto);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }


    @GetMapping("/data")
    public ResponseEntity<List<ApplicationResponseDto>> getAllApplications() {

        List<ApplicationResponseDto> applications =
                applicationService.getAllApplications();

        return ResponseEntity.ok(applications);
    }


    @PutMapping("{id}/status")
    public ResponseEntity<ApplicationResponseDto> updateApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        ApplicationResponseDto response =
                applicationService.updateApplicationStatus(id, status);

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteApplication(
            @PathVariable Long id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.ok("Application deleted successfully");
    }

}
