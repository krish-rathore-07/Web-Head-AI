package com.ai.gemini_app.service;

import com.ai.gemini_app.dto.ChangePasswordRequest;
import com.ai.gemini_app.dto.DeleteAccountRequest;
import com.ai.gemini_app.dto.UserResponse;
import com.ai.gemini_app.exception.BadRequestException;
import com.ai.gemini_app.exception.UserNotFoundException;
import com.ai.gemini_app.model.Chat;
import com.ai.gemini_app.model.User;
import com.ai.gemini_app.repository.ChatRepository;
import com.ai.gemini_app.repository.MessageRepository;
import com.ai.gemini_app.repository.UserRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;


    public UserResponse updateProfile(
            String userId,
            String newName
    ) {

        if (
                newName == null ||
                        newName.isBlank()
        ) {
            throw new BadRequestException(
                    "Name cannot be empty"
            );
        }

        String cleanName =
                newName.trim();

        if (cleanName.length() > 50) {
            throw new BadRequestException(
                    "Name cannot be longer than 50 characters"
            );
        }

        User user = userRepository
                .findById(userId)
                .orElseThrow(
                        () ->
                                new UserNotFoundException(
                                        "User not found"
                                )
                );

        user.setName(cleanName);

        User updatedUser =
                userRepository.save(user);

        return toUserResponse(
                updatedUser
        );
    }

    private UserResponse toUserResponse(
            User user
    ) {

        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public void changePassword(
            String userId,
            ChangePasswordRequest request
    ) {

        // Find logged-in user
        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found"
                        )
                );

        // Google users cannot change password
        if ("GOOGLE".equalsIgnoreCase(user.getProvider())) {

            throw new BadRequestException(
                    "Password is managed by your Google account."
            );
        }

        // Validate current password
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPassword()
        )) {

            throw new BadRequestException(
                    "Current password is incorrect."
            );
        }

        // Validate new password
        if (request.getNewPassword() == null
                || request.getNewPassword().isBlank()) {

            throw new BadRequestException(
                    "New password cannot be empty."
            );
        }

        // Minimum password length
        if (request.getNewPassword().length() < 8) {

            throw new BadRequestException(
                    "Password must be at least 8 characters."
            );
        }

        // Confirm password
        if (!request.getNewPassword()
                .equals(request.getConfirmPassword())) {

            throw new BadRequestException(
                    "Passwords do not match."
            );
        }

        // Prevent using the same password again
        if (passwordEncoder.matches(
                request.getNewPassword(),
                user.getPassword()
        )) {

            throw new BadRequestException(
                    "New password must be different from the current password."
            );
        }

        // Encode and save new password
        user.setPassword(
                passwordEncoder.encode(
                        request.getNewPassword()
                )
        );

        userRepository.save(user);
    }

    public void deleteAccount(
            String userId,
            DeleteAccountRequest request
    ) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found"
                        )
                );

        // Verify password for email users
        if (!"GOOGLE".equalsIgnoreCase(user.getProvider())) {

            if (!passwordEncoder.matches(
                    request.getPassword(),
                    user.getPassword()
            )) {

                throw new BadRequestException(
                        "Incorrect password."
                );
            }
        }

        // Find all chats
        List<Chat> chats =
                chatRepository.findByUserIdOrderByUpdatedAtDesc(userId);

        // Delete messages of each chat
        for (Chat chat : chats) {

            messageRepository.deleteByChatId(chat.getId());

        }

        // Delete chats
        chatRepository.deleteByUserId(userId);

        // Delete user
        userRepository.delete(user);
    }
}