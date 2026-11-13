package com.jobPortal.profile_service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProfileServiceApplication {

	public static void main(String[] args) {

		SpringApplication.run(ProfileServiceApplication.class, args);
		System.err.println("This is our profile-service ");
	}

}
