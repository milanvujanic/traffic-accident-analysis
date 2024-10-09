package com.analizasn.traffic_accident_analysis_backend.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseCookie;

@Getter
@AllArgsConstructor
public class AccessAndRefreshTokenCookies {
    private ResponseCookie accessTokenCookie;
    private ResponseCookie refreshTokenCookie;
}
