package com.jobPortal.application_service;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ApplicationServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(ApplicationServiceApplication.class, args);
		System.err.println("This is our application Service ");
	}

}
