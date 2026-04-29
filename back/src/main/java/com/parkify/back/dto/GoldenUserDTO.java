package com.parkify.back.dto;

public class GoldenUserDTO {
    private long id;
    private long count;

    public GoldenUserDTO(long id, long count) {
        this.id = id;
        this.count = count;
    }

    public long getId() {
        return id;
    }

    public long getCount() {
        return count;
    }
}
