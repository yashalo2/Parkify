package com.parkify.back.dto;

public class MessageSendDTO {
    private Long senderId;
    private Long receiverId;
    private String content;

    public MessageSendDTO(Long senderId, Long receiverId, String content) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
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
