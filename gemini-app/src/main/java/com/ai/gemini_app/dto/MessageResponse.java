package com.ai.gemini_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageResponse {

    private String id;
    private String role;
    private String content;
    private LocalDateTime createdAt;
}