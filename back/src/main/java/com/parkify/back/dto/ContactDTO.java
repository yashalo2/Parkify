package com.parkify.back.dto;

import java.time.Instant;

public class ContactDTO {
    private String fullName;
    private String email;
    private String date;
    private String message;
    private boolean replied;

    public ContactDTO(String fullName, String email, Instant date, String message, boolean replied) {
        this.fullName = fullName;
        this.email = email;
        this.date = date.toString();
        this.message = message;
        this.replied = replied;
    }

    public String getFullName() {
        return fullName;
    }

    public String getEmail() {
        return email;
    }

    public String getDate() {
        return date;
    }

    public String getMessage() {
        return message;
    }

    public boolean isReplied() {
        return replied;
    }
}
