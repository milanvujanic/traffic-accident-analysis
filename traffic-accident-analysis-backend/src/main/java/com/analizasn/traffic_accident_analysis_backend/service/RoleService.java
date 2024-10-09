package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.entity.Role;
import com.analizasn.traffic_accident_analysis_backend.entity.enums.RoleEnum;

public interface RoleService {
    Role findByName(RoleEnum name);
}
