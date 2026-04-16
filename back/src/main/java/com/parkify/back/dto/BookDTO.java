package com.parkify.back.dto;

public class BookDTO {
    private long id;
    private String area;
    private double price;
    private int level;
    private String spotCode;

    public String getSpotCode() {
        return spotCode;
    }

    public BookDTO(long id, String area, double price, int level, String spotCode) {
        this.id = id;
        this.area = area;
        this.price = price;
        this.level = level;
        this.spotCode = spotCode;
    }

    public long getId() {
        return id;
    }

    public String getArea() {
        return area;
    }

    public double getPrice() {
        return price;
    }

    public int getLevel() {
        return level;
    }


}
