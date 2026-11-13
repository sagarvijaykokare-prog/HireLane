package com.jobPortal.auth_service.repostory;

import com.jobPortal.auth_service.entity.Users;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users , Long> {
    @EntityGraph(attributePaths = "roles")
    Optional<Users> findByEmail(String email);

    boolean existsByEmail(@NotBlank(message = "Email is required ") @Email(message = "Enter the valid email ") String email);
}
