package com.parkify.back.dto;

import java.time.Instant;

public class MessageSendDTO {
    private Long senderId;
    private Long receiverId;
    private String content;
    private String date;

    public MessageSendDTO(Long senderId, Long receiverId, String content,Instant date) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.date = date.toString();
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public void setReceiverId(Long receiverId) {
        this.receiverId = receiverId;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDate(String date) {
        this.date = date;
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
