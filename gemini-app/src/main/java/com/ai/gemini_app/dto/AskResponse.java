package com.ai.gemini_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AskResponse {

    private MessageResponse userMessage;
    private MessageResponse assistantMessage;
}