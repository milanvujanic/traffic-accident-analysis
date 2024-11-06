package com.analizasn.traffic_accident_analysis_backend.service.impl;

import com.analizasn.traffic_accident_analysis_backend.entity.ResetPasswordToken;
import com.analizasn.traffic_accident_analysis_backend.entity.User;
import com.analizasn.traffic_accident_analysis_backend.service.MailService;
import com.analizasn.traffic_accident_analysis_backend.service.ResetPasswordTokenService;
import com.analizasn.traffic_accident_analysis_backend.service.ThymeleafService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailServiceImpl implements MailService {

    private final JavaMailSender javaMailSender;
    private final ThymeleafService thymeleafService;
    private final ResetPasswordTokenService resetPasswordTokenService;

    @Value("${spring.mail.username}")
    private String email;

    public MailServiceImpl(JavaMailSender javaMailSender, ThymeleafService thymeleafService, ResetPasswordTokenService resetPasswordTokenService) {
        this.javaMailSender = javaMailSender;
        this.thymeleafService = thymeleafService;
        this.resetPasswordTokenService = resetPasswordTokenService;
    }

    @Override
    public void sendResetPassword(User user) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", user.getUsername());
        variables.put("email", user.getEmail());
        variables.put("base_url", "http://localhost:3000/password/forgot/forward");

        ResetPasswordToken resetPasswordToken = getResetPasswordToken(user);
        variables.put("reset_password_token", resetPasswordToken.getToken().toString());

        messageHelper.setTo(user.getEmail());
        messageHelper.setFrom(email);
        messageHelper.setText(thymeleafService.createContent("reset-password.html", variables), true);
        messageHelper.setSubject("Traffic Accident Analysis: Reset password");

        javaMailSender.send(message);
    }

    private ResetPasswordToken getResetPasswordToken(User user) {
        resetPasswordTokenService.deleteByUserId(user.getUserId());
        return resetPasswordTokenService.createResetPasswordToken(user.getUserId());
    }
}
