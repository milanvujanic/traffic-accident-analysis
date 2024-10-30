package com.analizasn.traffic_accident_analysis_backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "reset_password_token", schema = "traffic_accident_analysis")
@Getter
@Setter
public class ResetPasswordToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reset_password_token_id")
    private Long resetPasswordTokenId;

    @Column(name = "token")
    private Long token;

    @Column(name = "expiry_date")
    private LocalDateTime expiryDate;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;
}
