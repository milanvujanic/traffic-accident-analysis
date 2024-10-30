package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.entity.ResetPasswordToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.exception.RefreshTokenExpiredException;
import com.analizasn.traffic_accident_analysis_backend.repository.ResetPasswordTokenRepository;
import com.analizasn.traffic_accident_analysis_backend.service.ResetPasswordTokenService;
import com.analizasn.traffic_accident_analysis_backend.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ResetPasswordTokenServiceImpl implements ResetPasswordTokenService {

    @Value("${security.reset.password.token.expiration-time}")
    private long resetPasswordTokenExpirationTime;

    private final ResetPasswordTokenRepository resetPasswordTokenRepository;
    private final UserService userService;

    public ResetPasswordTokenServiceImpl(ResetPasswordTokenRepository resetPasswordTokenRepository, UserService userService) {
        this.resetPasswordTokenRepository = resetPasswordTokenRepository;
        this.userService = userService;
    }

    @Override
    public ResetPasswordToken createResetPasswordToken(Long userId) {
        ResetPasswordToken resetPasswordToken = new ResetPasswordToken();
        SecureRandom secureRandom = new SecureRandom();
        do {
            resetPasswordToken.setToken(Math.abs(secureRandom.nextLong()));
        } while (existsByToken(resetPasswordToken.getToken()));
        resetPasswordToken.setUser(userService.findByUserId(userId));
        resetPasswordToken.setExpiryDate(LocalDateTime.now().plus(resetPasswordTokenExpirationTime, ChronoUnit.MILLIS));

        resetPasswordToken = resetPasswordTokenRepository.save(resetPasswordToken);
        return resetPasswordToken;
    }

    @Override
    public Optional<ResetPasswordToken> findByUser(User user) {
        return resetPasswordTokenRepository.findByUser(user);
    }

    @Override
    public ResetPasswordToken findByToken(Long token) {
        return resetPasswordTokenRepository.findByToken(token)
                .orElseThrow(() -> new NoSuchElementException("Can not find corresponding record in db for the given token!"));
    }

    @Override
    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userService.findByUserId(userId);
        return resetPasswordTokenRepository.deleteByUser(user);
    }

    @Override
    public boolean isResetPasswordTokenExpired(ResetPasswordToken resetPasswordToken) {
        return resetPasswordToken.getExpiryDate().isBefore(LocalDateTime.now());
    }

    @Override
    public ResetPasswordToken verifyExpiration(ResetPasswordToken resetPasswordToken) {
        if (resetPasswordToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            resetPasswordTokenRepository.delete(resetPasswordToken);
            throw new RefreshTokenExpiredException("Reset password token has expired. Please make a new reset password request");
        }
        return resetPasswordToken;
    }

    @Override
    public boolean existsByToken(Long token) {
        return resetPasswordTokenRepository.existsByToken(token);
    }

    @Override
    public boolean isResetPasswordTokenValid(ResetPasswordToken resetPasswordToken) {
        return existsByToken(resetPasswordToken.getToken()) && !isResetPasswordTokenExpired(resetPasswordToken);
    }
}
