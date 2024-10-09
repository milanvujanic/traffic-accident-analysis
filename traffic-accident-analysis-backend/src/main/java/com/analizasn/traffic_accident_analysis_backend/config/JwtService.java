package com.analizasn.traffic_accident_analysis_backend.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.codec.digest.HmacUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

@Service
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.access.expiration-time}")
    private long accessTokenexpirationTime;

    @Value("${security.jwt.access.cookie-name}")
    private String jwtAccessCookieName;

    @Value("${security.jwt.refresh.cookie-name}")
    private String jwtRefreshCookieName;

    @Value("${security.jwt.refresh.expiration-time}")
    private long refreshTokenExpirationTime;

    @Value("${security.csrf.secret-key}")
    private String csrfSecretKey;

    public String extractUsername(String token) {
        return claimsResolver(token, Claims::getSubject);
    }

    public Date extractExpirationTime(String token) {
        return claimsResolver(token, Claims::getExpiration);
    }

    public String extractCsrfToken(String token) {
        final Claims claims = extractAllClaims(token);
        return claims.get("X-XSRF-TOKEN", String.class);
    }

    private <T> T claimsResolver(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String generateToken(UserDetails userDetails) {
        return generateTokenFromUsername(userDetails.getUsername());
    }

    public String generateTokenFromUsername(String username) {
        String csrfToken = generateCsrfToken();
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("X-XSRF-TOKEN", csrfToken);
        return buildToken(extraClaims, username, accessTokenexpirationTime);
    }

    private String generateCsrfToken() {
        SecureRandom secureRandom = new SecureRandom();
        String data = String.valueOf(Math.abs(secureRandom.nextLong()));
        String algorithm = "HmacSHA256";
        return new HmacUtils(algorithm, csrfSecretKey).hmacHex(data);
    }

    public ResponseCookie generateAccessTokenCookie(String token) {
        return ResponseCookie
                .from(jwtAccessCookieName, token)
                .path("/api")
                .maxAge(accessTokenexpirationTime / 1000)
                .httpOnly(true)
                .sameSite("strict")
                .secure(false)
                .build();
    }

    public ResponseCookie getCleanAccessTokenCookie() {
        return ResponseCookie
                .from(jwtAccessCookieName, null)
                .path("/api")
                .httpOnly(true)
                .sameSite("strict")
                .build();
    }

    public ResponseCookie generateCsrfTokenCookie(String token) {
        return ResponseCookie
                .from("X-XSRF-TOKEN", token)
                .path("/api")
                .maxAge(accessTokenexpirationTime / 1000)
                .httpOnly(false)
                .sameSite("None")
                .build();
    }

    public ResponseCookie generateRefreshTokenCookie(String token) {
        return ResponseCookie
                .from(jwtRefreshCookieName, token)
                .path("/api/auth/refresh-token")
                .maxAge(refreshTokenExpirationTime / 1000)
                .httpOnly(true)
                .sameSite("strict")
                .secure(false)
                .build();
    }

    public ResponseCookie getCleanRefreshTokenCookie() {
        return ResponseCookie
                .from(jwtRefreshCookieName, null)
                .path("/api/auth/refresh-token")
                .httpOnly(true)
                .build();
    }

    private String buildToken(Map<String, Object> extraClaims, String username, long expirationTime) {
        return Jwts
                .builder()
                .claims(extraClaims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSignInKey())
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        return extractUsername(token).equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpirationTime(token).before(new Date());
    }

    public boolean validateJwtToken(String accessToken) {
        try {
            Jwts.parser().verifyWith(getSignInKey()).build().parse(accessToken);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }

    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    public Optional<String> getAccessTokenFromCookie(HttpServletRequest httpServletRequest) {
        return getTokenFromCookie(httpServletRequest, jwtAccessCookieName);
    }

    public Optional<String> getRefreshTokenFromCookie(HttpServletRequest httpServletRequest) {
        return getTokenFromCookie(httpServletRequest, jwtRefreshCookieName);
    }

    public Optional<String> getCsrfTokenFromCookie(HttpServletRequest httpServletRequest) {
        return getTokenFromCookie(httpServletRequest, "X-XSRF-TOKEN");
    }

    private Optional<String> getTokenFromCookie(HttpServletRequest httpServletRequest, String name) {
        Cookie cookie = WebUtils.getCookie(httpServletRequest, name);
        return cookie != null
                ? Optional.of(cookie.getValue())
                : Optional.empty();
    }
}


















