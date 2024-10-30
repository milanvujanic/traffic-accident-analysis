package com.analizasn.traffic_accident_analysis_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class ResetPasswordTokenException extends RuntimeException {

    public ResetPasswordTokenException(String message) {
        super(message);
    }
}
