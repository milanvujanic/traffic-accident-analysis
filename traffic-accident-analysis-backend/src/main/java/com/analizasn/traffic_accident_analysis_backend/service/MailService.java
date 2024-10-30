package com.analizasn.traffic_accident_analysis_backend.service;

import com.analizasn.traffic_accident_analysis_backend.entity.User;
import jakarta.mail.MessagingException;

public interface MailService {
    void sendResetPassword(User user) throws MessagingException;
}
