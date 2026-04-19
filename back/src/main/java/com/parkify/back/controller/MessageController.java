package com.parkify.back.controller;

import com.parkify.back.dto.MessageSendDTO;
import com.parkify.back.model.Message;
import com.parkify.back.model.User;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat")
    public void chat(@Payload MessageSendDTO dto){
//        long senderId = dto.getSender();
//        long receiverId = dto.getReceiverId();
//        User sender = userRepository.findMeById((int) senderId);
//        User receiver = userRepository.findMeById((int) receiverId);
//        Message message = new Message();
//        message.setSender(sender);
//        message.setReceiver(receiver);
//        message.setContent(dto.getContent());
//
//        messageService.sendMessage(message);
        System.out.println("Chat Message" + dto.getSender());
    }



}
