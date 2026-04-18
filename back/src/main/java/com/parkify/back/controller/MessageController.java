package com.parkify.back.controller;

import com.parkify.back.model.Message;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat")
    public void chat(@Payload Message message, SimpMessageHeaderAccessor headerAccessor){

        User receiver = userRepository.findByRole(Role.Admin);
        message.setReceiver(receiver);
        messageService.sendMessage(message);
    }



}
