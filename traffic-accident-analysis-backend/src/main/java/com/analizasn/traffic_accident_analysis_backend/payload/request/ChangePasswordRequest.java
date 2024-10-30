package com.analizasn.traffic_accident_analysis_backend.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ChangePasswordRequest extends VerifyTokenRequest {
    @NotBlank(message = "Password must contain at least 8 characters")
    @Size(min = 8, message = "Password must contain at least 8 characters")
    @Size(max = 30, message = "Password must contain at most 30 characters")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,30}$", message = "Password must contain small letters, capital letters and numbers")
    private String password;
}
