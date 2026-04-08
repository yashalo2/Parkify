package com.parkify.back.model;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="parkinglots")
public class ParkingLots {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Enumerated(EnumType.STRING)
    private LotStatus status;
    @OneToOne
    @JoinColumn( columnDefinition = "parkingArea_id")
    private ParkingArea area;

    @PrePersist
    public void prePersist() {
        status=LotStatus.Available;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LotStatus getStatus() {
        return status;
    }

    public void setStatus(LotStatus status) {
        this.status = status;
    }

    public ParkingArea getArea() {
        return area;
    }

    public void setArea(ParkingArea area) {
        this.area = area;
    }
}
