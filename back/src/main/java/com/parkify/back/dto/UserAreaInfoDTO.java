package com.parkify.back.dto;

public class UserAreaInfoDTO {
    private long id;
    private String name;
    private double minPrice;
    private double maxPrice;
    private long available;
    private long reserved;
    private long occupied;

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public double getMinPrice() {
        return minPrice;
    }

    public double getMaxPrice() {
        return maxPrice;
    }

    public long getAvailable() {
        return available;
    }

    public long getReserved() {
        return reserved;
    }

    public long getOccupied() {
        return occupied;
    }

    public UserAreaInfoDTO(long id, String name, double minPrice, double maxPrice, long available , long occupied, long reserved) {
        this.id = id;
        this.name = name;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.available = available;
        this.reserved = reserved;
        this.occupied = occupied;
    }
}
