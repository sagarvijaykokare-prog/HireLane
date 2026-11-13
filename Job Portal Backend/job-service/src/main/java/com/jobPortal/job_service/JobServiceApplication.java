package com.jobPortal.job_service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class JobServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(JobServiceApplication.class, args);
		System.err.println("This is our  job-microservice ");
	}

}