package com.parkify.back.dto;

import com.parkify.back.model.LotStatus;

public class ActiveLevelDTO {
    private long number;
    private String status;

    public ActiveLevelDTO(long number, LotStatus status) {
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
