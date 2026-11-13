package com.jobPortal.auth_service.config;

import com.jobPortal.auth_service.entity.Roles;
import com.jobPortal.auth_service.entity.Users;
import com.jobPortal.auth_service.repostory.RoleRepository;
import com.jobPortal.auth_service.repostory.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    public CommandLineRunner createFirstAdmin(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.existsByEmail(adminEmail)) {
                System.out.println("Admin account already exists.");
                return;
            }

            Roles adminRole = roleRepository.findByName("ROLE_ADMIN")
                    .orElseThrow(() ->
                            new RuntimeException("ROLE_ADMIN not found"));

            Users admin = new Users();
            admin.setEmail(adminEmail);
            admin.setPasswordHash(
                    passwordEncoder.encode(adminPassword));
            admin.setEnabled(true);
            admin.getRoles().add(adminRole);

            userRepository.save(admin);

            System.out.println("Initial ADMIN account created.");
        };
    }

}
