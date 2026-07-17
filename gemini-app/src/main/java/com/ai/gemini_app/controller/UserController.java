package com.ai.gemini_app.controller;

import com.ai.gemini_app.dto.ChangePasswordRequest;
import com.ai.gemini_app.dto.DeleteAccountRequest;
import com.ai.gemini_app.dto.UpdateProfileRequest;
import com.ai.gemini_app.dto.UserResponse;
import com.ai.gemini_app.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        UserResponse updatedUser =
                userService.updateProfile(
                        userId,
                        request.getName()
                );

        return ResponseEntity.ok(
                updatedUser
        );
    }

    @PatchMapping("/me/password")
    public ResponseEntity<Void> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication authentication
    ) {

        String userId = authentication.getName();

        userService.changePassword(userId, request);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteAccount(
            @RequestBody DeleteAccountRequest request,
            Authentication authentication
    ) {

        String userId = authentication.getName();

        userService.deleteAccount(userId, request);

        return ResponseEntity.noContent().build();
    }
}