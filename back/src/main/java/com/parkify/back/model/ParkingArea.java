package com.parkify.back.model;
import com.parkify.back.model.ParkingLots;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="ParkingArea")
public class ParkingArea {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private int id;
    @Column(length=50)
    private String name;
    @Column(length=50)
    private String description;
    private double latitude;
    private double longitude;
    @Enumerated(EnumType.STRING)
    private ParkingAreaStatus parkingAreaStatus;
    @OneToMany(mappedBy="parkingArea",cascade=CascadeType.ALL)
    private List<ParkingLots> parkingLots;
    @PrePersist
    public void prePersist() {
        parkingAreaStatus = ParkingAreaStatus.Open;
    }

    public ParkingAreaStatus getParkingAreaStatus() {
        return parkingAreaStatus;
    }

    public void setParkingAreaStatus(ParkingAreaStatus parkingAreaStatus) {
        this.parkingAreaStatus = parkingAreaStatus;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public List<ParkingLots> getParkingLots() {
        return parkingLots;
    }

    public void setParkingLots(List<ParkingLots> parkingLots) {
        this.parkingLots = parkingLots;
    }
}
