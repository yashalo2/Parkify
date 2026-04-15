package com.parkify.back.model;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="parkinglots")
public class ParkingLots {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Enumerated(EnumType.STRING)
    private LotStatus status;
    private double price;
    private int level;

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

    @ManyToOne
    @JoinColumn(name = "parking_area_id")
    private ParkingArea parkingArea;
    @OneToMany(mappedBy = "parkingLots", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Spots> spots;
    @PrePersist
    public void prePersist() {
        status=LotStatus.Open;
    }
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public LotStatus getStatus() {
        return status;
    }

    public ParkingArea getParkingArea() {
        return parkingArea;
    }

    public void setParkingArea(ParkingArea parkingArea) {
        this.parkingArea = parkingArea;
    }

    public List<Spots> getSpots() {
        return spots;
    }

    public void setSpots(List<Spots> spots) {
        this.spots = spots;
    }

    public void setStatus(LotStatus status) {
        this.status = status;
    }

}
