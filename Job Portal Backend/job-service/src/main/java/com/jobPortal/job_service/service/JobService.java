package com.jobPortal.job_service.service;

import com.jobPortal.job_service.dto.JobCreateDto;
import com.jobPortal.job_service.dto.JobResponse;
import com.jobPortal.job_service.entity.Job;
import com.jobPortal.job_service.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private JobRepository jobRepository ;
    public JobService(JobRepository jobRepository){
        this.jobRepository = jobRepository ;
    }

    public JobResponse createJob(JobCreateDto jobCreateDto) {
        Job job = new Job();
        job.setTitle(jobCreateDto.getTitle());
        job.setDescription(jobCreateDto.getDescription());
        job.setCompanyName(jobCreateDto.getCompanyName());
        job.setLocation(jobCreateDto.getLocation());
        job.setEmploymentType(jobCreateDto.getEmploymentType());
        job.setWorkMode(jobCreateDto.getWorkMode());
        job.setExperienceMin(jobCreateDto.getExperienceMin());
        job.setExperienceMax(jobCreateDto.getExperienceMax());
        job.setSalaryMin(jobCreateDto.getSalaryMin());
        job.setSalaryMax(jobCreateDto.getSalaryMax());
        job.setSkills(jobCreateDto.getSkills());

        jobRepository.save(job);

        JobResponse res = new JobResponse();
        res.setMessage("job created successfully");

     return res;
    }

    public List<JobCreateDto> readData() {
        List<Job> jobs = jobRepository.findAll();

        return jobs.stream().map(job -> {

            JobCreateDto response = new JobCreateDto();
            response.setTitle(job.getTitle());
            response.setDescription(job.getDescription());
            response.setCompanyName(job.getCompanyName());
            response.setLocation(job.getLocation());
            response.setEmploymentType(job.getEmploymentType());
            response.setWorkMode(job.getWorkMode());
            response.setExperienceMin(job.getExperienceMin());
            response.setExperienceMax(job.getExperienceMax());
            response.setSalaryMin(job.getSalaryMin());
            response.setSalaryMax(job.getSalaryMax());
            response.setSkills(job.getSkills());
            response.setStatus(job.getStatus());

            return response;

        }).toList();
    }

    public JobResponse updateJob(Long id, JobCreateDto jobCreateDto) {
        Job job = jobRepository.findById(id).orElseThrow(()->new RuntimeException("Job is not found "));

        job.setTitle(jobCreateDto.getTitle());
        job.setDescription(jobCreateDto.getDescription());
        job.setCompanyName(jobCreateDto.getCompanyName());
        job.setLocation(jobCreateDto.getLocation());
        job.setEmploymentType(jobCreateDto.getEmploymentType());
        job.setWorkMode(jobCreateDto.getWorkMode());
        job.setExperienceMin(jobCreateDto.getExperienceMin());
        job.setExperienceMax(jobCreateDto.getExperienceMax());
        job.setSalaryMin(jobCreateDto.getSalaryMin());
        job.setSalaryMax(jobCreateDto.getSalaryMax());
        job.setSkills(jobCreateDto.getSkills());
        job.setStatus(jobCreateDto.getStatus());

        jobRepository.save(job);

        JobResponse res= new JobResponse();
        res.setMessage("Job updated Successfully ");

        return res;
    }

    public void deleteJob(Long id) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Job not found with id: " + id
                ));


        jobRepository.delete(job);
    }


}
