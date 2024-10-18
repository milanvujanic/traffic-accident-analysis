package com.analizasn.traffic_accident_analysis_backend.exception;

import java.util.List;

public record ExceptionDto(List<String> message, int statusCode) {

}
