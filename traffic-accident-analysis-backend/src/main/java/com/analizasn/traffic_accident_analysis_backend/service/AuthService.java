package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.payload.request.LoginRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.request.SignupRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.response.AccessAndRefreshTokenCookies;
import com.analizasn.traffic_accident_analysis_backend.payload.response.LoginResponseWithJwtCookies;
import com.analizasn.traffic_accident_analysis_backend.payload.response.RefreshTokenResponse;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Optional;

public interface AuthService {
    LoginResponseWithJwtCookies handleSignin(LoginRequest loginRequest);
    void handleSignup(SignupRequest signupRequest);
    Optional<RefreshTokenResponse> handleRefreshToken(HttpServletRequest httpServletRequest);
    AccessAndRefreshTokenCookies handeSignout(HttpServletRequest httpServletRequest);

}
