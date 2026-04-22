package com.parkify.back.model;

import jakarta.persistence.*;

@Entity
@Table(name="ExitScanner")
public class ExitScanner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String code;
    @OneToOne
    @JoinColumn(name="parkingArea_id",referencedColumnName = "id")
    private ParkingArea parkingArea;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }


}
