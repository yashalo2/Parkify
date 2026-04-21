package com.parkify.back.dto;

import java.time.Instant;

public class MessageSendDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
    private String date;

    public MessageSendDTO(Long senderId, Long receiverId, String content) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
    }


    public Long getSenderId() {
        return senderId;
    }

    public String getDate() {
        return date;
    }

    public Long getSender() {
        return senderId;
    }

    public Long getReceiverId() {
        return receiverId;
    }

    public String getContent() {
        return content;
    }
}
