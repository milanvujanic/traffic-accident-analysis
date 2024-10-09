package com.analizasn.traffic_accident_analysis_backend.rest;

import com.analizasn.traffic_accident_analysis_backend.payload.request.LoginRequest;
import com.analizasn.traffic_accident_analysis_backend.payload.response.MessageResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class DummyPageController {

    @PostMapping("/dummy-page")
    public ResponseEntity<MessageResponse> dummyPage(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(new MessageResponse("Dummy page content"));
    }
}
