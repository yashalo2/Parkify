package com.parkify.back.dto;

public class LotInfoDTO {
    private int lotName;
    private int spots;
    private double price;

    public int getLotName() {
        return lotName;
    }

    public int getSpots() {
        return spots;
    }

    public double getPrice() {
        return price;
    }

    public LotInfoDTO(int lotName, int spots, double price) {
        this.lotName = lotName;
        this.spots = spots;
        this.price = price;
    }
}
