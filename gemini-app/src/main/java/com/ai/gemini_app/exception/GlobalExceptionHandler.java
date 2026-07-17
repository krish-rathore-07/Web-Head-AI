package com.ai.gemini_app.exception;

import com.ai.gemini_app.dto.ErrorResponse;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==============================
    // CHAT NOT FOUND
    // ==============================

    @ExceptionHandler(
            ChatNotFoundException.class
    )
    public ResponseEntity<ErrorResponse>
    handleChatNotFound(
            ChatNotFoundException exception,
            HttpServletRequest request
    ) {

        ErrorResponse errorResponse =
                ErrorResponse.builder()
                        .status(
                                HttpStatus.NOT_FOUND.value()
                        )
                        .error(
                                HttpStatus.NOT_FOUND
                                        .getReasonPhrase()
                        )
                        .message(
                                exception.getMessage()
                        )
                        .path(
                                request.getRequestURI()
                        )
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }

    // ==============================
    // BAD REQUEST
    // ==============================

    @ExceptionHandler(
            BadRequestException.class
    )
    public ResponseEntity<ErrorResponse>
    handleBadRequest(
            BadRequestException exception,
            HttpServletRequest request
    ) {

        ErrorResponse errorResponse =
                ErrorResponse.builder()
                        .status(
                                HttpStatus.BAD_REQUEST.value()
                        )
                        .error(
                                HttpStatus.BAD_REQUEST
                                        .getReasonPhrase()
                        )
                        .message(
                                exception.getMessage()
                        )
                        .path(
                                request.getRequestURI()
                        )
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(errorResponse);
    }

    // ==============================
    // GEMINI API ERROR
    // ==============================

    @ExceptionHandler(
            GeminiApiException.class
    )
    public ResponseEntity<ErrorResponse>
    handleGeminiApiException(
            GeminiApiException exception,
            HttpServletRequest request
    ) {

        ErrorResponse errorResponse =
                ErrorResponse.builder()
                        .status(
                                HttpStatus.BAD_GATEWAY.value()
                        )
                        .error(
                                HttpStatus.BAD_GATEWAY
                                        .getReasonPhrase()
                        )
                        .message(
                                exception.getMessage()
                        )
                        .path(
                                request.getRequestURI()
                        )
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        return ResponseEntity
                .status(HttpStatus.BAD_GATEWAY)
                .body(errorResponse);
    }

    // ==============================
    // UNKNOWN ERROR
    // ==============================

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse>
    handleGenericException(
            Exception exception,
            HttpServletRequest request
    ) {

        // Keep the real error in backend logs
        exception.printStackTrace();

        ErrorResponse errorResponse =
                ErrorResponse.builder()
                        .status(
                                HttpStatus.INTERNAL_SERVER_ERROR
                                        .value()
                        )
                        .error(
                                HttpStatus.INTERNAL_SERVER_ERROR
                                        .getReasonPhrase()
                        )
                        .message(
                                "Something went wrong. Please try again."
                        )
                        .path(
                                request.getRequestURI()
                        )
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        return ResponseEntity
                .status(
                        HttpStatus.INTERNAL_SERVER_ERROR
                )
                .body(errorResponse);
    }
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFound(
            UserNotFoundException exception,
            HttpServletRequest request
    ) {

        ErrorResponse errorResponse =
                ErrorResponse.builder()
                        .status(
                                HttpStatus.NOT_FOUND.value()
                        )
                        .error(
                                HttpStatus.NOT_FOUND
                                        .getReasonPhrase()
                        )
                        .message(
                                exception.getMessage()
                        )
                        .path(
                                request.getRequestURI()
                        )
                        .timestamp(
                                LocalDateTime.now()
                        )
                        .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(errorResponse);
    }
}