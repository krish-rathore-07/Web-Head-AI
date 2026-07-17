package com.ai.gemini_app.repository;

import com.ai.gemini_app.model.Chat;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends MongoRepository<Chat, String> {

    List<Chat> findByUserIdOrderByUpdatedAtDesc(String userId);

    void deleteByUserId(String userId);

    Optional<Chat> findByIdAndUserId(String id, String userId);
}