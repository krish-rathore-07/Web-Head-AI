package com.ai.gemini_app.service;

import com.ai.gemini_app.exception.GeminiApiException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import com.fasterxml.jackson.databind.JsonNode;
import java.util.Map;


@Service
public class QnAService {

    @Value("${gemini.api.url}")
    private String geminiApiUrl;

    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public QnAService(ObjectMapper objectMapper) {
        this.webClient = WebClient.builder().build();
        this.objectMapper = objectMapper;
    }

//    public QnAService(WebClient.Builder webClient) {
//        this.webClient = webClient.build();
//    }

    public String getAnswer(
            String question
    ) {

        try {

            Map<String, Object> requestBody =
                    Map.of(
                            "contents",
                            new Object[]{
                                    Map.of(
                                            "parts",
                                            new Object[]{
                                                    Map.of(
                                                            "text",
                                                            question
                                                    )
                                            }
                                    )
                            }
                    );

            String response =
                    webClient
                            .post()
                            .uri(
                                    geminiApiUrl
                                            + geminiApiKey
                            )
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .bodyValue(requestBody)
                            .retrieve()
                            .bodyToMono(String.class)
                            .block();

            if (
                    response == null ||
                            response.isBlank()
            ) {
                throw new GeminiApiException(
                        "AI returned an empty response"
                );
            }

            return response;

        } catch (GeminiApiException exception) {

            throw exception;

        } catch (Exception exception) {

            throw new GeminiApiException(
                    "AI service is currently unavailable. Please try again.",
                    exception
            );
        }
    }

}

