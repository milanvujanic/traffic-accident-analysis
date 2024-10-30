package com.analizasn.traffic_accident_analysis_backend.payload.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class VerifyTokenRequest {

    @NotNull
    private Long resetPasswordToken;
}
