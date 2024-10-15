package com.analizasn.traffic_accident_analysis_backend.rest;

import com.analizasn.traffic_accident_analysis_backend.payload.response.MessageResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HomeController {

    @PostMapping("/home")
    public ResponseEntity<MessageResponse> getHomePage(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(new MessageResponse("You did it!"));
    }
}
