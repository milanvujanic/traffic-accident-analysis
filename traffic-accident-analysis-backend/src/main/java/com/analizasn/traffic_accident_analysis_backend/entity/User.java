package com.analizasn.traffic_accident_analysis_backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users", schema = "traffic_accident_analysis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Size(min = 3, message = "Username must contain at least 3 characters")
    @Pattern(regexp = "^\\w{3,}$", message = "Allowed characters: letters, digits and underscore")
    @Column(name = "username")
    private String username;

    @Size(min = 1, message = "Email is required")
    @Email(regexp = "[a-z0-9]+@[a-z]+\\.[a-z]{2,3}", message = "Invalid email address")
    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();
}
