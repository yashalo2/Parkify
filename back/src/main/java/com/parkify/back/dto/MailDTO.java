package com.parkify.back.dto;

public class MailDTO {
    private String subject;
    private String content;

    public MailDTO(String subject, String content) {
        this.subject = subject;
        this.content = content;
    }

    public String getSubject() {
        return subject;
    }

    public String getContent() {
        return content;
    }
}
