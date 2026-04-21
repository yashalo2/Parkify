package com.parkify.back.controller;

import com.parkify.back.dto.MessageSendDTO;
import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.Message;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.MessageService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequestMapping("api/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/getMyMessages")
    public List<MessageSendDTO> getMyMessages(HttpSession session){
        long id = (long) session.getAttribute("id");
        return messageService.getMyMessages(id);
    }
    @GetMapping("/needyUsers")
    public List<UserDTO> getNeedyUsers(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return null;

        }
        User user = userRepository.findByEmail(email);
        if(user.getRole() == Role.Admin){
            return messageService.getNeedyUsers();
        }
        return null;
    }
    @GetMapping("/{id}/messages")
    public List<MessageSendDTO> getMessages(HttpSession session, @PathVariable long id){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return null;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole() == Role.Admin){
            return messageService.getMyMessages(id);
        }
        return null;
    }
    @MessageMapping("/chat")
    public void chat(@Payload MessageSendDTO dto){
        long senderId = dto.getSender();
        long receiverId = dto.getReceiverId();
        User sender = userRepository.findMeById(senderId);
        User receiver = userRepository.findMeById(receiverId);
        Message message = new Message();

        message.setSender(sender);
        message.setReceiver(receiver);
        message.setContent(dto.getContent());

        messageService.sendMessage(message);
    }



}
