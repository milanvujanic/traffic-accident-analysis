package com.analizasn.traffic_accident_analysis_backend.repository;

import com.analizasn.traffic_accident_analysis_backend.entity.ResetPasswordToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResetPasswordTokenRepository extends JpaRepository<ResetPasswordToken, Long> {
    Optional<ResetPasswordToken> findByToken(Long token);

    Optional<ResetPasswordToken> findByUser(User user);

    boolean existsByToken(Long token);

    @Modifying
    int deleteByUser(User user);
}
