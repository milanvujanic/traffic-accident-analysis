package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.entity.User;

public interface UserService {
    User findByUserId(Long userId);
    User findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User save(User user);
}
