package com.parkify.back.dto;

import java.time.Instant;

public class UserBookingsDTO {
    private String date;
    private String name;
    private int level;
    private String spot;

    public UserBookingsDTO(Instant date, String name, int level, String spot) {
        this.date = date.toString();
        this.name = name;
        this.level = level;
        this.spot = spot;
    }

    public String getDate() {
        return date;
    }

    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public String getSpot() {
        return spot;
    }
}
