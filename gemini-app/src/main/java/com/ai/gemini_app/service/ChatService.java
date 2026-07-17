package com.ai.gemini_app.service;

import com.ai.gemini_app.dto.AskResponse;
import com.ai.gemini_app.dto.MessageResponse;
import com.ai.gemini_app.exception.BadRequestException;
import com.ai.gemini_app.exception.ChatNotFoundException;
import com.ai.gemini_app.model.Chat;
import com.ai.gemini_app.model.Message;
import com.ai.gemini_app.repository.ChatRepository;
import com.ai.gemini_app.repository.MessageRepository;
import com.ai.gemini_app.service.QnAService;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final QnAService qnAService;
    private final ObjectMapper objectMapper;

    // Create a new chat
    public Chat createChat(
            String userId,
            String title
    ) {

        LocalDateTime now =
                LocalDateTime.now();

        Chat chat = Chat.builder()
                .userId(userId)
                .title(
                        title == null || title.isBlank()
                                ? "New Chat"
                                : title
                )
                .createdAt(now)
                .updatedAt(now)
                .build();

        return chatRepository.save(chat);
    }

    // Get all chats belonging to logged-in user
    public List<Chat> getUserChats(
            String userId
    ) {

        return chatRepository
                .findByUserIdOrderByUpdatedAtDesc(
                        userId
                );
    }

    // Get one chat securely
    public Chat getChat(
            String chatId,
            String userId
    ) {

        return chatRepository
                .findByIdAndUserId(
                        chatId,
                        userId
                )
                .orElseThrow(
                        () -> new ChatNotFoundException(
                                "Chat not found"
                        )
                );
    }

    // Get messages from one chat
    public List<Message> getMessages(
            String chatId,
            String userId
    ) {

        // Verify ownership first
        getChat(chatId, userId);

        return messageRepository
                .findByChatIdOrderByCreatedAtAsc(
                        chatId
                );
    }

    public AskResponse askQuestion(
            String chatId,
            String userId,
            String question
    ) {

        // 1. Verify the chat belongs to the logged-in user
        Chat chat = getChat(chatId, userId);

        if (question == null || question.isBlank()) {
            throw new BadRequestException(
                    "Question cannot be empty"
            );
        }

        // 2. Save the user's message
        Message userMessage = Message.builder()
                .chatId(chatId)
                .role("user")
                .content(question.trim())
                .createdAt(LocalDateTime.now())
                .build();

        userMessage =
                messageRepository.save(userMessage);

        // 3. Call the existing Gemini service
        String rawGeminiResponse =
                qnAService.getAnswer(question.trim());

        // 4. Extract the actual text
        String assistantText =
                extractGeminiText(rawGeminiResponse);

        // 5. Save the assistant message
        Message assistantMessage =
                Message.builder()
                        .chatId(chatId)
                        .role("assistant")
                        .content(assistantText)
                        .createdAt(LocalDateTime.now())
                        .build();

        assistantMessage =
                messageRepository.save(
                        assistantMessage
                );

        // 6. Update chat title for the first message
        if (
                chat.getTitle() == null ||
                        chat.getTitle().isBlank() ||
                        chat.getTitle().equals("New Chat")
        ) {
            chat.setTitle(
                    generateTitle(question)
            );
        }

        // 7. Update latest activity time
        chat.setUpdatedAt(
                LocalDateTime.now()
        );

        chatRepository.save(chat);

        // 8. Return both saved messages
        return new AskResponse(
                toMessageResponse(userMessage),
                toMessageResponse(assistantMessage)
        );
    }

    private String extractGeminiText(
            String rawResponse
    ) {

        try {

            JsonNode root =
                    objectMapper.readTree(rawResponse);

            JsonNode textNode =
                    root.path("candidates")
                            .path(0)
                            .path("content")
                            .path("parts")
                            .path(0)
                            .path("text");

            if (
                    textNode.isMissingNode() ||
                            textNode.isNull()
            ) {
                throw new RuntimeException(
                        "Gemini returned no answer"
                );
            }

            return textNode.asText();

        } catch (Exception exception) {

            throw new RuntimeException(
                    "Failed to process Gemini response",
                    exception
            );
        }
    }

    private String generateTitle(
            String question
    ) {

        String cleanQuestion =
                question.trim();

        int maxLength = 40;

        if (
                cleanQuestion.length()
                        <= maxLength
        ) {
            return cleanQuestion;
        }

        return cleanQuestion
                .substring(0, maxLength)
                .trim()
                + "...";
    }
    private MessageResponse toMessageResponse(
            Message message
    ) {

        return new MessageResponse(
                message.getId(),
                message.getRole(),
                message.getContent(),
                message.getCreatedAt()
        );
    }

    public void deleteChat(
            String chatId,
            String userId
    ) {
        // Verify that the chat belongs to the logged-in user
        Chat chat = getChat(chatId, userId);

        // Delete all messages belonging to this chat
        messageRepository.deleteByChatId(chatId);

        // Delete the chat
        chatRepository.delete(chat);
    }

    public Chat renameChat(
            String chatId,
            String userId,
            String newTitle
    ) {

        // Verify that the chat belongs to the logged-in user
        Chat chat = getChat(
                chatId,
                userId
        );

        // Validate title
        if (
                newTitle == null ||
                        newTitle.isBlank()
        ) {
            throw new RuntimeException(
                    "Chat title cannot be empty"
            );
        }

        // Update title
        chat.setTitle(
                newTitle.trim()
        );

        // Update timestamp
        chat.setUpdatedAt(
                LocalDateTime.now()
        );

        // Save updated chat
        return chatRepository.save(chat);
    }


}