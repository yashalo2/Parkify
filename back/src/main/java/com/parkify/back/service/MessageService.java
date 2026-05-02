package com.parkify.back.service;

import com.parkify.back.dto.MessageSendDTO;
import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.Message;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.MessageRepository;
import com.parkify.back.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {
    @Autowired
    private SimpMessageSendingOperations messagingTemplate;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    public void sendMessage(Message message){

        Message saved = messageRepository.save(message);
        MessageSendDTO messageSendDTO =new  MessageSendDTO(saved.getReceiver().getId(),saved.getSender().getId(),saved.getContent(),saved.getDate());
        messagingTemplate.convertAndSend("/topic/message/" + message.getReceiver().getId(),messageSendDTO);
    }
    public void sendAlert(String current,String name,String Parking,long userId){
        String message= """
                Hello! """ + name + """
                 you are using a wrong Entrance Code for the wrong parking are
                 your booking is for """ + Parking + """
                but you are using it to get in to """ + current +"""
                ,so please check you booking and use it to get in to the right parking area
                """;
        messagingTemplate.convertAndSend("/topic/alert/" + userId,message);
        System.out.println(userId);

    }
    public List<MessageSendDTO> getMyMessages(long id){
        return messageRepository.findMyMessages(id);
    }
    public List<UserDTO> getNeedyUsers(){
        return messageRepository.findNeedyUsers(Role.Customer);
    }
    public List<UserDTO> getNeedyUsersBySearch(String search){
        return messageRepository.findNeedyUsersBySearch(search,Role.Customer);
    }
}
