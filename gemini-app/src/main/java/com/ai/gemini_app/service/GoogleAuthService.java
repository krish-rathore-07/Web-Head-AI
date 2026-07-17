package com.ai.gemini_app.service;

import com.ai.gemini_app.dto.GoogleLoginRequest;
import com.ai.gemini_app.dto.LoginResponse;
import com.ai.gemini_app.model.User;
import com.ai.gemini_app.repository.UserRepository;
import com.ai.gemini_app.security.JwtService;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${google.client.id}")
    private String googleClientId;

    public LoginResponse loginWithGoogle(
            GoogleLoginRequest request
    ) {

        try {

            GoogleIdTokenVerifier verifier =
                    new GoogleIdTokenVerifier.Builder(
                            GoogleNetHttpTransport
                                    .newTrustedTransport(),
                            GsonFactory.getDefaultInstance()
                    )
                            .setAudience(
                                    Collections.singletonList(
                                            googleClientId
                                    )
                            )
                            .build();

            GoogleIdToken idToken =
                    verifier.verify(
                            request.getCredential()
                    );

            if (idToken == null) {
                throw new RuntimeException(
                        "Invalid Google token"
                );
            }

            GoogleIdToken.Payload payload =
                    idToken.getPayload();

            String googleId =
                    payload.getSubject();

            String email =
                    payload.getEmail();

            String name =
                    (String) payload.get("name");

            String profilePicture =
                    (String) payload.get("picture");

            User user = userRepository
                    .findByEmail(email)
                    .orElseGet(() -> {

                        User newUser =
                                User.builder()
                                        .name(name)
                                        .email(email)
                                        .provider("GOOGLE")
                                        .providerId(googleId)
                                        .profilePicture(
                                                profilePicture
                                        )
                                        .createdAt(
                                                LocalDateTime.now()
                                        )
                                        .build();

                        return userRepository.save(
                                newUser
                        );
                    });

            String token =
                    jwtService.generateToken(
                            user.getId(),
                            user.getEmail()
                    );

            return new LoginResponse(
                    token,
                    user.getId(),
                    user.getName(),
                    user.getEmail()
            );

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Google authentication failed",
                    exception
            );
        }
    }
}