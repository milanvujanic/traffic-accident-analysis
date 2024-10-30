package com.analizasn.traffic_accident_analysis_backend.exception.config;

import com.analizasn.traffic_accident_analysis_backend.exception.*;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.IntStream;

import static java.util.stream.Collectors.*;

@RestControllerAdvice
public class GlobalControllerExceptionHandler extends ResponseEntityExceptionHandler {

    private static final String NO_PROPERTY = "";

    @ExceptionHandler({UsernameAlreadyTakenException.class, EmailAlreadyTakenException.class})
    public ResponseEntity<ExceptionDto> handleUsernameOrEmailAlreadyTakenException(RuntimeException runtimeException) {
        ExceptionDto exceptionDto = new ExceptionDto(constructExceptionResponse(List.of(NO_PROPERTY), List.of(List.of((runtimeException.getMessage())))), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({RefreshTokenException.class, RefreshTokenExpiredException.class, ResetPasswordTokenException.class})
    public ResponseEntity<ExceptionDto> handleRefreshTokenException(RuntimeException runtimeException) {
        ExceptionDto exceptionDto = new ExceptionDto(constructExceptionResponse(List.of(NO_PROPERTY), List.of(List.of(runtimeException.getMessage()))), HttpStatus.FORBIDDEN.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ExceptionDto> handleAuthenticationException(RuntimeException exception) {
        ExceptionDto exceptionDto = new ExceptionDto(constructExceptionResponse(List.of(NO_PROPERTY), List.of(List.of("Bad credentials!"))), HttpStatus.UNAUTHORIZED.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.UNAUTHORIZED);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException methodArgumentNotValidException,
                                                                  @NonNull HttpHeaders headers,
                                                                  @NonNull HttpStatusCode status,
                                                                  @NonNull WebRequest request) {
        Map<String, List<String>> errorMessages = methodArgumentNotValidException.getBindingResult().getFieldErrors().stream()
                .filter(Objects::nonNull)
                .collect(groupingBy(FieldError::getField, mapping(FieldError::getDefaultMessage, toList())));
        ExceptionDto exceptionDto = new ExceptionDto(constructExceptionResponse(errorMessages.keySet().stream().toList(), errorMessages.values().stream().toList()), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }

    private Map<String, List<String>> constructExceptionResponse(List<String> property, List<List<String>> messages) {
        return IntStream.range(0, property.size())
                .boxed()
                .collect(toMap(property::get, messages::get));
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionDto> handleMessagingException(Exception exception) {
        ExceptionDto exceptionDto = new ExceptionDto(constructExceptionResponse(List.of(NO_PROPERTY), List.of(List.of(exception.getMessage()))), HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>(exceptionDto, HttpStatus.BAD_REQUEST);
    }
}
