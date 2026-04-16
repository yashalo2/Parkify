package com.parkify.back.dto;

import com.parkify.back.model.SpotStatus;

public class SpaceDTO {
    private int level;
    private String name;
    private long id;
    private String status;

    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public long getId() {
        return id;
    }

    public String getStatus() {
        return status;
    }

    public SpaceDTO(int level,String name, long id, SpotStatus status) {
        this.level = level;
        this.name = name;
        this.id = id;
        this.status = status.toString();
    }
}
