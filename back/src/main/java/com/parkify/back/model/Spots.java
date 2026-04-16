package com.parkify.back.model;

import jakarta.persistence.*;

@Entity
@Table(name="Spots")
public class Spots {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String spotName;

    private SpotStatus spotStatus;
    @ManyToOne
    @JoinColumn(name="parkingLots_id")
    private ParkingLots parkingLots;
    @PrePersist
    public void prePersist() {
        spotStatus = SpotStatus.Available;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSpotName() {
        return spotName;
    }

    public void setSpotName(String spotName) {
        this.spotName = spotName;
    }

    public SpotStatus getSpotStatus() {
        return spotStatus;
    }

    public void setSpotStatus(SpotStatus spotStatus) {
        this.spotStatus = spotStatus;
    }

    public ParkingLots getParkingLots() {
        return parkingLots;
    }

    public void setParkingLots(ParkingLots parkingLots) {
        this.parkingLots = parkingLots;
    }
}
