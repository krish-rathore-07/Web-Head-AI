package com.ai.gemini_app.controller;

import com.ai.gemini_app.dto.CreateChatRequest;
import com.ai.gemini_app.dto.UpdateChatTitleRequest;
import com.ai.gemini_app.model.Chat;
import com.ai.gemini_app.model.Message;
import com.ai.gemini_app.service.ChatService;
import org.springframework.http.MediaType;

import reactor.core.publisher.Flux;
import lombok.RequiredArgsConstructor;
import com.ai.gemini_app.dto.AskRequest;
import com.ai.gemini_app.dto.AskResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    // Create new chat
    @PostMapping
    public ResponseEntity<Chat> createChat(
            @RequestBody CreateChatRequest request,
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        Chat chat =
                chatService.createChat(
                        userId,
                        request.getTitle()
                );

        return ResponseEntity.ok(chat);
    }

    // Get logged-in user's chats
    @GetMapping
    public ResponseEntity<List<Chat>> getChats(
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        return ResponseEntity.ok(
                chatService.getUserChats(userId)
        );
    }

    // Get messages from one chat
    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<Message>> getMessages(
            @PathVariable String chatId,
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        return ResponseEntity.ok(
                chatService.getMessages(
                        chatId,
                        userId
                )
        );
    }

    @PostMapping("/{chatId}/ask")
    public ResponseEntity<AskResponse> askQuestion(
            @PathVariable String chatId,
            @RequestBody AskRequest request,
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        AskResponse response =
                chatService.askQuestion(
                        chatId,
                        userId,
                        request.getQuestion()
                );

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{chatId}")
    public ResponseEntity<Void> deleteChat(
            @PathVariable String chatId,
            Authentication authentication
    ) {
        String userId = authentication.getName();

        chatService.deleteChat(
                chatId,
                userId
        );

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{chatId}")
    public ResponseEntity<Chat> renameChat(
            @PathVariable String chatId,
            @RequestBody UpdateChatTitleRequest request,
            Authentication authentication
    ) {

        String userId =
                authentication.getName();

        Chat updatedChat =
                chatService.renameChat(
                        chatId,
                        userId,
                        request.getTitle()
                );

        return ResponseEntity.ok(
                updatedChat
        );
    }

}