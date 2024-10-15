package com.analizasn.traffic_accident_analysis_backend.entity.enums;

public enum TokenType {
    REFRESH_TOKEN("refresh_token"),
    ACCESS_TOKEN("access_token"),
    XSRF_TOKEN("xsrf_token");

    private final String tokenName;

    TokenType(String tokenName) {
        this.tokenName = tokenName;
    }

    public String getTokenName() {
        return tokenName;
    }
}
