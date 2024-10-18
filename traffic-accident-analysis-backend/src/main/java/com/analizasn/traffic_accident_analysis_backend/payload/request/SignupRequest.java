package com.analizasn.traffic_accident_analysis_backend.payload.request;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class SignupRequest {

    @Size(min = 3, message = "Username must contain at least 3 characters")
    @Pattern(regexp = "^\\w{3,}$", message = "Allowed characters: letters, digits and underscore")
    @Column(name = "username")
    private String username;

    @Size(min = 1, message = "Email is required")
    @Email(regexp = "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}", message = "Invalid email address")
    @Column(name = "email")
    private String email;

    private String password;
    private Set<String> roles;
}
