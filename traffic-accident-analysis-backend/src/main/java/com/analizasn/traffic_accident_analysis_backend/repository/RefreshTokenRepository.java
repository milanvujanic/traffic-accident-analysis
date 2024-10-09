package com.analizasn.traffic_accident_analysis_backend.repository;

import com.analizasn.traffic_accident_analysis_backend.entity.RefreshToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(Long token);

    Optional<RefreshToken> findByUser(User user);

    @Modifying
    int deleteByUser(User user);
}
