package com.ai.gemini_app.repository;

import com.ai.gemini_app.model.Chat;
import com.ai.gemini_app.model.Message;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, String> {

    List<Message> findByChatIdOrderByCreatedAtAsc(String chatId);

    void deleteByChatId(String chatId);
}