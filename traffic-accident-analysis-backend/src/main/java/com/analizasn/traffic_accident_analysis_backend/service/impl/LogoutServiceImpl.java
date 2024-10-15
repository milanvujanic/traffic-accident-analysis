package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.config.JwtService;
import com.analizasn.traffic_accident_analysis_backend.entity.RefreshToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.service.LogoutService;
import com.analizasn.traffic_accident_analysis_backend.service.RefreshTokenService;
import com.analizasn.traffic_accident_analysis_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LogoutServiceImpl implements LogoutService {

    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> refreshToken = jwtService.getRefreshTokenFromCookie(request);

        refreshToken.ifPresent(refToken -> processSignout(refToken, (UserDetails) authentication.getPrincipal()));
    }

    private void processSignout(String refreshToken, UserDetails userDetails) {
        RefreshToken refreshTokenDb = refreshTokenService.findByToken(Long.parseLong(refreshToken));
        if (refreshTokenService.isRefreshTokenExpired(refreshTokenDb)) {
            User user = userService.findByUsername(userDetails.getUsername());
            refreshTokenService.deleteByUserId(user.getUserId());
        }
    }
}
