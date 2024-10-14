package com.analizasn.traffic_accident_analysis_backend.exception.config;

import com.analizasn.traffic_accident_analysis_backend.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerExceptionHandler {

    @ExceptionHandler({UsernameAlreadyTakenException.class, EmailAlreadyTakenException.class})
    public ResponseEntity<ExceptionDto> handleUsernameOrEmailAlreadyTakenException(RuntimeException runtimeException) {
        ExceptionDto exceptionDto = new ExceptionDto(runtimeException.getMessage(), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({RefreshTokenException.class, RefreshTokenExpiredException.class})
    public ResponseEntity<ExceptionDto> handleRefreshTokenException(RuntimeException runtimeException) {
        ExceptionDto exceptionDto = new ExceptionDto(runtimeException.getMessage(), HttpStatus.FORBIDDEN.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionDto> handleAuthenticationException(Exception exception) {
        ExceptionDto exceptionDto = new ExceptionDto("Bad credentials!", HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.UNAUTHORIZED);
    }
}
