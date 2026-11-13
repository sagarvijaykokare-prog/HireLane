package com.jobPortal.job_service.controller;

import com.jobPortal.job_service.dto.JobCreateDto;
import com.jobPortal.job_service.dto.JobResponse;
import com.jobPortal.job_service.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/job")
public class JobController {

    private JobService jobService ;
    public JobController(JobService jobService){
        this.jobService = jobService;
    }

    @PostMapping("/create")
    public JobResponse createJob(@RequestBody JobCreateDto jobCreateDto){
       JobResponse  res =  jobService.createJob(jobCreateDto);
       return res ;
    }

    @GetMapping("/read")
    public List<JobCreateDto> readData(){
        return jobService.readData();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable Long id,
            @RequestBody JobCreateDto jobCreateDto) {

        JobResponse response = jobService.updateJob(id, jobCreateDto);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteJob(@PathVariable Long id) {

        jobService.deleteJob(id);

        return ResponseEntity.ok("Job deleted successfully");
    }

}
