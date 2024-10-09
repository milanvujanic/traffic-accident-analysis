package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.entity.RefreshToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;

import java.util.Optional;

public interface RefreshTokenService {

    RefreshToken findByToken(Long token);
    RefreshToken createRefreshToken(Long userId);
    RefreshToken verifyExpiration(RefreshToken refreshToken);
    int deleteByUserId(Long userId);
    Optional<RefreshToken> findByUser(User user);
    boolean isRefreshTokenExpired(RefreshToken refreshToken);
}
