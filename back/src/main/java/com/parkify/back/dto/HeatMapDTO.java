package com.parkify.back.dto;

import java.time.Instant;

public class HeatMapDTO {
    private String date;
    private long count;

    public HeatMapDTO(Instant date, long count) {
        this.date = date.toString();
        this.count = count;
    }

    public String getDate() {
        return date;
    }

    public long getCount() {
        return count;
    }
}
