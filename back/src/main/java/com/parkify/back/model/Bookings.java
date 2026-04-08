package com.parkify.back.model;
import jakarta.persistence.*;
import com.parkify.back.model.ParkingLots;
@Entity
@Table(name="Bookings")
public class Bookings {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;



}
