package com.parkify.back.dto;

import com.parkify.back.model.AreaStatus;

public class ActiveAreaDTO {
    private long number;
    private String status;

    public ActiveAreaDTO(long number, AreaStatus status) {
        this.number = number;
        this.status = status.toString();
    }

    public long getNumber() {
        return number;
    }

    public String getStatus() {
        return status;
    }
}
