package com.ai.gemini_app.controller;

import com.ai.gemini_app.dto.*;
import com.ai.gemini_app.service.AuthService;
import com.ai.gemini_app.service.GoogleAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:5173", "https://web-head-ai.vercel.app"})
public class AuthController {

    private final GoogleAuthService googleAuthService;
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @RequestBody RegisterRequest request
    ) {
        AuthResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ) {

        LoginResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/google")
    public ResponseEntity<LoginResponse> googleLogin(
            @RequestBody GoogleLoginRequest request
    ) {

        return ResponseEntity.ok(
                googleAuthService.loginWithGoogle(request)
        );
    }
}