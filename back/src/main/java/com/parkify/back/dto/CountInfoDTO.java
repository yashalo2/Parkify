package com.parkify.back.dto;

import com.parkify.back.model.BookingStatus;

public class CountInfoDTO {
    private double total;
    private String status;
    public CountInfoDTO(double total, BookingStatus status) {
        this.total = total;
        this.status = status.toString();
    }

    public double getTotal() {
        return total;
    }

    public String getStatus() {
        return status;
    }
}
