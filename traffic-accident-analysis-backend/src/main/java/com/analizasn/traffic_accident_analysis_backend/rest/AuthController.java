package com.analizasn.traffic_accident_analysis_backend.rest;

import com.analizasn.traffic_accident_analysis_backend.entity.enums.TokenType;
import com.analizasn.traffic_accident_analysis_backend.exception.RefreshTokenException;
import com.analizasn.traffic_accident_analysis_backend.payload.request.LoginRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.request.SignupRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.response.*;
import com.analizasn.traffic_accident_analysis_backend.service.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/signin")
    public ResponseEntity<LoginResponse> signin(@RequestBody LoginRequest loginRequest, HttpServletRequest httpServletRequest) {
        LoginResponseWithJwtCookies response = authService.handleSignin(loginRequest, httpServletRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, response.getRefreshTokenCookie().toString())
                .header(HttpHeaders.SET_COOKIE, response.getAccessTokenCookie().toString())
                .header(TokenType.XSRF_TOKEN.getTokenName(), response.getCsrfToken())
                .body(response.getLoginResponse());
    }

    @PostMapping("/signup")
    public ResponseEntity<MessageResponse> signup(@RequestBody @Valid SignupRequest signupRequest) {
        authService.handleSignup(signupRequest);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PostMapping(value = "/signout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<MessageResponse> signout(HttpServletRequest httpServletRequest) {
        AccessAndRefreshTokenCookies accessAndRefreshTokenCookies = authService.handeSignout(httpServletRequest);
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessAndRefreshTokenCookies.getRefreshTokenCookie().toString())
                .header(HttpHeaders.SET_COOKIE, accessAndRefreshTokenCookies.getAccessTokenCookie().toString())
                .body(new MessageResponse("You have been signed out!"));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<MessageResponse> refreshToken(HttpServletRequest httpServletRequest) {
        Optional<RefreshTokenResponse> refreshTokenResponse = authService.handleRefreshToken(httpServletRequest);
        if (refreshTokenResponse.isPresent()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, refreshTokenResponse.get().getAccessTokenCookie().toString())
                    .header(TokenType.XSRF_TOKEN.getTokenName(), refreshTokenResponse.get().getCsrfToken())
                    .body(new MessageResponse("Token is refreshed successfully!"));
        }

        throw new RefreshTokenException("Refresh token not found in database!");
    }
}



























