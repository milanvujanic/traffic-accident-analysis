package com.analizasn.traffic_accident_analysis_backend.rest;

import com.analizasn.traffic_accident_analysis_backend.entity.ResetPasswordToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.exception.ResetPasswordTokenException;
import com.analizasn.traffic_accident_analysis_backend.payload.request.ChangePasswordRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.request.VerifyTokenRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.request.ForgotPasswordRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.response.MessageResponse;
import com.analizasn.traffic_accident_analysis_backend.service.MailService;
import com.analizasn.traffic_accident_analysis_backend.service.ResetPasswordTokenService;
import com.analizasn.traffic_accident_analysis_backend.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/password")
public class PasswordController {

    private final UserService userService;
    private final MailService mailService;
    private final ResetPasswordTokenService resetPasswordTokenService;
    private final PasswordEncoder passwordEncoder;

    public PasswordController(UserService userService, MailService mailService, ResetPasswordTokenService resetPasswordTokenService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.mailService = mailService;
        this.resetPasswordTokenService = resetPasswordTokenService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/forgot")
    public ResponseEntity<MessageResponse> forgotPasswordRequest(@RequestBody @Valid ForgotPasswordRequest forgotPasswordRequest) throws MessagingException {
        User user = userService.findByEmail(forgotPasswordRequest.getEmail());
        mailService.sendResetPassword(user);
        return ResponseEntity.ok(new MessageResponse("Check your inbox, reset password email is sent"));
    }

    @PostMapping("/forgot/verify-token")
    public ResponseEntity<MessageResponse> verifyResetPasswordToken(@RequestBody @Valid VerifyTokenRequest verifyTokenRequest) {
        ResetPasswordToken resetPasswordToken = resetPasswordTokenService.findByToken(verifyTokenRequest.getResetPasswordToken());
        if (resetPasswordTokenService.isResetPasswordTokenValid(resetPasswordToken)) {
            return ResponseEntity.ok(new MessageResponse("ResetPasswordToken verified!"));
        }
        throw new ResetPasswordTokenException("Invalid ResetPasswordToken!");
    }

    @PostMapping("/forgot/change-password")
    public ResponseEntity<MessageResponse> changeForgottenPassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest) {
        ResetPasswordToken resetPasswordToken = resetPasswordTokenService.findByToken(changePasswordRequest.getResetPasswordToken());
        if (resetPasswordTokenService.isResetPasswordTokenValid(resetPasswordToken)) {
            User user = resetPasswordToken.getUser();
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getPassword()));
            userService.save(user);
            return new ResponseEntity<>(new MessageResponse("Password changed successfully!"), HttpStatus.CREATED);
        }
        throw new ResetPasswordTokenException("Invalid ResetPasswordToken!");
    }
}
