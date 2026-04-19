package com.parkify.back.model;
import jakarta.persistence.*;
import com.parkify.back.model.ParkingLots;

import java.time.Instant;

@Entity
@Table(name="Bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    private double price;
    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    private Instant bookingDate;
    @ManyToOne
    @JoinColumn(name="spot_id")
    private Spots spot;

    public Spots getSpot() {
        return spot;
    }

    public void setSpot(Spots spot) {
        this.spot = spot;
    }

    @PrePersist
    public void prePersist() {
        status = BookingStatus.Open;
        bookingDate = Instant.now();
    }

    public Instant getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Instant bookingDate) {
        this.bookingDate = bookingDate;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
