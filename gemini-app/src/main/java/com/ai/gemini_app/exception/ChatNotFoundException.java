package com.ai.gemini_app.exception;

public class ChatNotFoundException
        extends RuntimeException {

    public ChatNotFoundException(
            String message
    ) {
        super(message);
    }
}