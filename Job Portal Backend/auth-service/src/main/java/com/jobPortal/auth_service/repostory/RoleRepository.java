package com.jobPortal.auth_service.repostory;

import com.jobPortal.auth_service.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository  extends JpaRepository<Roles , Long> {

   Optional<Roles> findByName(String name );
}
