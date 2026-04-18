package com.parkify.back.repository;

import com.parkify.back.model.Message;
import com.parkify.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message,Integer> {
    List<Message> findByReceiver(User receiver);
}
