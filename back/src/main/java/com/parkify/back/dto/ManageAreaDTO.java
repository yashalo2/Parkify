package com.parkify.back.dto;

import com.parkify.back.model.AreaStatus;

public class ManageAreaDTO {
    private long id;
    private String name;
    private long levels;
    private String status;

    public ManageAreaDTO(long id,String name, Long levels, AreaStatus status) {
        this.id = id;
        this.name = name;
        this.levels = levels;
        this.status = status.toString();
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }

    public long getLevels() {
        return levels;
    }


    public String getStatus() {
        return status;
    }


}
