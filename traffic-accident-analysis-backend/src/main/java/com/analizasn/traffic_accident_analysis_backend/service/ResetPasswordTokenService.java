package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.entity.ResetPasswordToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;

import java.util.Optional;

public interface ResetPasswordTokenService {
    ResetPasswordToken createResetPasswordToken(Long userId);
    Optional<ResetPasswordToken> findByUser(User user);
    ResetPasswordToken findByToken(Long token);
    int deleteByUserId(Long userId);
    boolean isResetPasswordTokenExpired(ResetPasswordToken resetPasswordToken);
    ResetPasswordToken verifyExpiration(ResetPasswordToken resetPasswordToken);
    boolean existsByToken(Long token);
    boolean isResetPasswordTokenValid(ResetPasswordToken resetPasswordToken);
}
