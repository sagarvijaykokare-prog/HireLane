package com.jobPortal.application_service.repository;

import com.jobPortal.application_service.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application , Long> {


}
