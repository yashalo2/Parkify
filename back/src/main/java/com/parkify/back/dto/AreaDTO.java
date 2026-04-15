package com.parkify.back.dto;

public class AreaDTO {
    private String name;
    private long id;

    public AreaDTO(String name, long id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }
}
