package com.parkify.back.dto;

import com.parkify.back.model.BookingStatus;

import java.time.Instant;

public class AreaBookingDTO {
    private String email;
    private String bookingDate;
    private String status;
    public AreaBookingDTO(String email, Instant bookingDate, BookingStatus status) {
        this.email = email;
        this.bookingDate = bookingDate.toString();
        this.status = status.toString();
    }

    public String getEmail() {
        return email;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public String getStatus() {
        return status;
    }
}
