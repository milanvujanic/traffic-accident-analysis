package com.analizasn.traffic_accident_analysis_backend.repository;

import com.analizasn.traffic_accident_analysis_backend.entity.Role;
import com.analizasn.traffic_accident_analysis_backend.entity.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleEnum name);
}
