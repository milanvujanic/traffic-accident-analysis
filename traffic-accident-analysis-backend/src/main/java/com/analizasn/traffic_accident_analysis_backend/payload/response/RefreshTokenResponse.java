package com.analizasn.traffic_accident_analysis_backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseCookie;

@Getter
@AllArgsConstructor
public class RefreshTokenResponse {
    private final ResponseCookie accessTokenCookie;
    private final ResponseCookie csrfTokenCookie;
}
