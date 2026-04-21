package com.parkify.back.dto;

import java.time.Instant;

public class PaymentInfoDTO {
    private long id;
    private String email;
    private int level;
    private String spot;
    private double price;
    private double total;
    private String date;
    private String area;

    public PaymentInfoDTO(long id, String email, int level, String spot, double price, double total, Instant date, String area) {
        this.id = id;
        this.email = email;
        this.level = level;
        this.spot = spot;
        this.price = price;
        this.total = total;
        this.date = date.toString();
        this.area = area;
    }

    public String getArea() {
        return area;
    }

    public String getDate() {
        return date;
    }

    public long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public int getLevel() {
        return level;
    }

    public String getSpot() {
        return spot;
    }

    public double getPrice() {
        return price;
    }

    public double getTotal() {
        return total;
    }
}
