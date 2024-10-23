package com.analizasn.traffic_accident_analysis_backend.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ExceptionDto {
    private Map<String, List<String>> messages;
    private int statusCode;
}
