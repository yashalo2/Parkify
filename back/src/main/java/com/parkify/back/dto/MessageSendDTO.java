package com.parkify.back.dto;

public class MessageSendDTO {
    private int senderId;
    private int receiver;
    private String content;

    public MessageSendDTO(int sender, int receiver, String content) {
        this.senderId = sender;
        this.receiver = receiver;
        this.content = content;
    }

    public int getSender() {
        return senderId;
    }

    public int getReceiver() {
        return receiver;
    }

    public String getContent() {
        return content;
    }
}
