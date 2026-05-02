package com.parkify.back.dto;

import com.parkify.back.model.LotStatus;

public class LevelDTO {
    private long id;
    private int level;
    private String status;

    public LevelDTO(long id, int level, LotStatus status) {
        this.id = id;
        this.level = level;
        this.status = status.toString();
    }

    public long getId() {
        return id;
    }

    public int getLevel() {
        return level;
    }

    public String getStatus() {
        return status;
    }
}
