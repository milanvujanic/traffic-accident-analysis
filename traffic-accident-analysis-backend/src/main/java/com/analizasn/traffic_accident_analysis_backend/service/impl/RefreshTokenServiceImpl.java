package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.entity.RefreshToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.exception.RefreshTokenExpiredException;
import com.analizasn.traffic_accident_analysis_backend.repository.RefreshTokenRepository;
import com.analizasn.traffic_accident_analysis_backend.service.RefreshTokenService;
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
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${security.jwt.refresh.expiration-time}")
    private long refreshTokenExpirationTime;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserService userService;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, UserService userService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userService = userService;
    }

    @Override
    public RefreshToken findByToken(Long token) {
        return refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new NoSuchElementException("Can not find corresponding record in db for the given token!"));
    }

    @Override
    public RefreshToken createRefreshToken(Long userId) {
        RefreshToken refreshToken = new RefreshToken();
        SecureRandom secureRandom = new SecureRandom();
        refreshToken.setToken(Math.abs(secureRandom.nextLong()));
        refreshToken.setUser(userService.findByUserId(userId));
        refreshToken.setExpiryDate(LocalDateTime.now().plus(refreshTokenExpirationTime, ChronoUnit.MILLIS));

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken;
    }

    @Override
    public RefreshToken verifyExpiration(RefreshToken refreshToken) {
        if (refreshToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new RefreshTokenExpiredException("Refresh token has expired. Please make a new signin request");
        }
        return refreshToken;
    }

    @Override
    @Transactional
    public int deleteByUserId(Long userId) {
        User user = userService.findByUserId(userId);
        return refreshTokenRepository.deleteByUser(user);
    }

    @Override
    public Optional<RefreshToken> findByUser(User user) {
        return refreshTokenRepository.findByUser(user);
    }

    @Override
    public boolean isRefreshTokenExpired(RefreshToken refreshToken) {
        return refreshToken.getExpiryDate().isBefore(LocalDateTime.now());
    }
}








































