package com.parkify.back.dto;

public class AddGateDTO {
    private long id;
    private String parkingArea;
    private long levels;
    private long spots;

    public AddGateDTO(long id, String parkingArea, long levels, long spots) {
        this.id = id;
        this.parkingArea = parkingArea;
        this.levels = levels;
        this.spots = spots;
    }

    public long getId() {
        return id;
    }

    public String getParkingArea() {
        return parkingArea;
    }

    public long getLevels() {
        return levels;
    }

    public long getSpots() {
        return spots;
    }
}
