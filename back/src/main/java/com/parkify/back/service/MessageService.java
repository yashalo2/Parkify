package com.parkify.back.service;

import com.parkify.back.model.Message;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.MessageRepository;
import com.parkify.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Service
public class MessageService {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public void sendMessage(Message message){
        User receiver =userRepository.findByRole(Role.Admin);
        message.setReceiver(receiver);
        Message saved = messageRepository.save(message);
        messagingTemplate.convertAndSend("/topic/message/" + message.getReceiver(),saved);
    }
}
