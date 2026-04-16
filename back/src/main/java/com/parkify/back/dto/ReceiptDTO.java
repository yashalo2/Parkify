package com.parkify.back.dto;

import com.parkify.back.model.BookingStatus;

import java.time.Duration;
import java.time.Instant;

public class ReceiptDTO {
    private long id;
    private String area;
    private int level;
    private String spot;
    private double price;
    private String date;
    private String status;
    private double total;
    private double durationHour;

    public double getTotal() {
        return total;
    }


    public long getId() {
        return id;
    }

    public String getArea() {
        return area;
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

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    public Double getDuration() {
        return durationHour;
    }

    void total(Instant start, Instant end, double price){
        Duration duration = Duration.between(start, end);
        double durationHours = duration.toHours();
        total = durationHours * price;

    }
    public ReceiptDTO(long id, String area, int level, String spot, double price, Instant date, BookingStatus status) {
        this.id = id;
        this.area = area;
        this.level = level;
        this.spot = spot;
        this.price = price;
        this.date = date.toString();
        this.status = status.toString();
        Duration duration = Duration.between(date,Instant.now());
        durationHour = duration.toHours();
        total(date, Instant.now(),price);
    }
}
