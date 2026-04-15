package com.parkify.back.dto;

public class SpotDTO {
    private int level;
    private double price;
    private long parkingArea;
    private int spots;

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public long getParkingArea() {
        return parkingArea;
    }

    public void setParkingArea(long parkingArea) {
        this.parkingArea = parkingArea;
    }

    public int getSpots() {
        return spots;
    }

    public void setSpots(int spots) {
        this.spots = spots;
    }

    public SpotDTO(int level, double price, long parkingArea, int spots) {
        this.level = level;
        this.price = price;
        this.parkingArea = parkingArea;
        this.spots = spots;
    }
}
