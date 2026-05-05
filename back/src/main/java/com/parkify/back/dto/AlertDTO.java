package com.parkify.back.dto;

import java.time.Instant;

public class AlertDTO {
    private long id;
    private String message;
    private String date;

    public AlertDTO(long id, String message, Instant date) {
        this.id = id;
        this.message = message;
        this.date = date.toString();
    }

    public long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public String getDate() {
        return date;
    }
}
