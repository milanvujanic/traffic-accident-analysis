package com.analizasn.traffic_accident_analysis_backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseCookie;

@AllArgsConstructor
@Getter
public class LoginResponseWithJwtCookies {
    private final LoginResponse loginResponse;
    private final ResponseCookie accessTokenCookie;
    private final ResponseCookie refreshTokenCookie;
    private final String csrfToken;
}
