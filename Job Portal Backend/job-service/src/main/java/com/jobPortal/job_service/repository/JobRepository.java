package com.jobPortal.job_service.repository;

import com.jobPortal.job_service.entity.Job;
import org.jspecify.annotations.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job , Long> {
   Optional<Job> findById(@NonNull Long id );
}
