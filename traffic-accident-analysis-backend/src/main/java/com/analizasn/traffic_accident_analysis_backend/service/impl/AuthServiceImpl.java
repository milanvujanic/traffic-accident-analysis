package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.config.JwtService;
import com.analizasn.traffic_accident_analysis_backend.entity.RefreshToken;
import com.analizasn.traffic_accident_analysis_backend.entity.Role;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.entity.enums.RoleEnum;
import com.analizasn.traffic_accident_analysis_backend.exception.EmailAlreadyTakenException;
import com.analizasn.traffic_accident_analysis_backend.exception.UsernameAlreadyTakenException;
import com.analizasn.traffic_accident_analysis_backend.payload.request.LoginRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.request.SignupRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.response.AccessAndRefreshTokenCookies;
import com.analizasn.traffic_accident_analysis_backend.payload.response.LoginResponse;
import com.analizasn.traffic_accident_analysis_backend.payload.response.LoginResponseWithJwtCookies;
import com.analizasn.traffic_accident_analysis_backend.payload.response.RefreshTokenResponse;
import com.analizasn.traffic_accident_analysis_backend.service.AuthService;
import com.analizasn.traffic_accident_analysis_backend.service.RefreshTokenService;
import com.analizasn.traffic_accident_analysis_backend.service.RoleService;
import com.analizasn.traffic_accident_analysis_backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

import static java.util.stream.Collectors.toSet;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final RoleService roleService;
    private final UserDetailsService userDetailsService;

    public AuthServiceImpl(AuthenticationManager authenticationManager, JwtService jwtService, RefreshTokenService refreshTokenService, UserService userService, PasswordEncoder passwordEncoder, RoleService roleService, UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.roleService = roleService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public LoginResponseWithJwtCookies handleSignin(LoginRequest loginRequest, HttpServletRequest httpServletRequest) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
        SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);

        User user = userService.findByUsername(loginRequest.getUsername());

        Set<String> roles = user.getRoles().stream()
                .map(role -> role.getName().name())
                .collect(toSet());

        LoginResponse loginResponse = new LoginResponse(loginRequest.getUsername(), user.getEmail(), roles);

        return constructLoginResponseWithJwtCookies(loginResponse, user);
    }

    private LoginResponseWithJwtCookies constructLoginResponseWithJwtCookies(LoginResponse loginResponse,
                                                                             User user) {
        String accessToken = jwtService.generateTokenFromUsername(loginResponse.getUsername());
        String csrfToken = jwtService.extractCsrfToken(accessToken);

        Optional<RefreshToken> refreshToken = refreshTokenService.findByUser(user);
        RefreshToken refreshTokenForResponse;

        // Todo: This logic is implemented because of server stopping which leaves refresh token in db
        // so need to first check whether there is already refresh token assigned to the user
        if (refreshToken.isPresent()) {
            if (refreshTokenService.isRefreshTokenExpired(refreshToken.get())) {
                refreshTokenService.deleteByUserId(user.getUserId());
                refreshTokenForResponse = refreshTokenService.createRefreshToken(user.getUserId());
            } else {
                refreshTokenForResponse = refreshToken.get();
            }
        } else {
            refreshTokenForResponse = refreshTokenService.createRefreshToken(user.getUserId());
        }

        ResponseCookie accessTokenCookie = jwtService.generateAccessTokenCookie(accessToken);
        ResponseCookie refreshTokenCookie = jwtService.generateRefreshTokenCookie(refreshTokenForResponse.getToken().toString());

        return new LoginResponseWithJwtCookies(loginResponse, accessTokenCookie, refreshTokenCookie, csrfToken);
    }

    @Override
    public void handleSignup(SignupRequest signupRequest) {
        if (userService.existsByUsername(signupRequest.getUsername())) {
            throw new UsernameAlreadyTakenException("Username is already taken!");
        }

        if (userService.existsByEmail(signupRequest.getEmail())) {
            throw new EmailAlreadyTakenException("Email address is already taken!");
        }

        handleUserSave(signupRequest);
    }

    @Override
    public Optional<RefreshTokenResponse> handleRefreshToken(HttpServletRequest httpServletRequest) {
        Optional<String> token = jwtService.getRefreshTokenFromCookie(httpServletRequest);

        if (token.isPresent() && !token.get().isEmpty()) {
            RefreshToken refreshToken = refreshTokenService.findByToken(Long.parseLong(token.get()));
            refreshTokenService.verifyExpiration(refreshToken);
            User user = refreshToken.getUser();
            String accessToken = jwtService.generateTokenFromUsername(user.getUsername());
            String csrfToken = jwtService.extractCsrfToken(accessToken);
            return Optional.of(new RefreshTokenResponse(
                    jwtService.generateAccessTokenCookie(accessToken),
                    jwtService.generateCsrfTokenCookie(csrfToken)));
        }

        return Optional.empty();
    }

    private void handleUserSave(SignupRequest signupRequest) {
        Set<Role> roles = signupRequest.getRoles().stream()
                .filter(roleName -> roleName != null && !roleName.isBlank())
                .map(RoleEnum::valueOf)
                .map(roleService::findByName)
                .collect(toSet());

        if (roles.isEmpty()) {
            roles.add(roleService.findByName(RoleEnum.ROLE_USER));
        }

        User user = User
                .builder()
                .username(signupRequest.getUsername())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .email(signupRequest.getEmail())
                .roles(roles)
                .build();

        userService.save(user);
    }

    @Override
    public AccessAndRefreshTokenCookies handeSignout(HttpServletRequest httpServletRequest) {
        Optional<String> refreshToken = jwtService.getRefreshTokenFromCookie(httpServletRequest);
        if (refreshToken.isPresent()) {
            String username = jwtService.extractUsername(refreshToken.get());
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            processSignout(refreshToken.get(), userDetails);
        }

        ResponseCookie accessTokenCookie = jwtService.getCleanAccessTokenCookie();
        ResponseCookie refreshTokenCookie = jwtService.getCleanRefreshTokenCookie();

        return new AccessAndRefreshTokenCookies(accessTokenCookie, refreshTokenCookie);
    }

    private void processSignout(String refreshToken, UserDetails userDetails) {
        RefreshToken refreshTokenDb = refreshTokenService.findByToken(Long.parseLong(refreshToken));
        if (refreshTokenService.isRefreshTokenExpired(refreshTokenDb)) {
            User user = userService.findByUsername(userDetails.getUsername());
            refreshTokenService.deleteByUserId(user.getUserId());
        }
    }
}































