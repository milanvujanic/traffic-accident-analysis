package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.entity.Role;
import com.analizasn.traffic_accident_analysis_backend.entity.enums.RoleEnum;
import com.analizasn.traffic_accident_analysis_backend.repository.RoleRepository;
import com.analizasn.traffic_accident_analysis_backend.service.RoleService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public Role findByName(RoleEnum name) {
        return roleRepository.findByName(name).orElseThrow(() -> new NoSuchElementException("Incorrect role assigned!"));
    }
}
