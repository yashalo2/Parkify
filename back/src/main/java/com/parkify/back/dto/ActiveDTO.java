package com.parkify.back.dto;

import java.time.Instant;

public class ActiveDTO {
    private long count;
    private String date;

    public ActiveDTO(long count, Instant date) {
        this.count = count;
        this.date = date.toString();
    }

    public long getCount() {
        return count;
    }

    public String getDate() {
        return date;
    }
}
