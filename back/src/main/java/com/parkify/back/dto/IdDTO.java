package com.parkify.back.dto;

import java.sql.Date;

public class IdDTO {
    private long id;
    private String name;
    private String date;
    private double gross;
    public IdDTO(Long id,String name, Date date, Double gross) {
        this.id = id;
        this.name = name;
        this.date = date.toString();
        this.gross = gross;
    }

    public String getName() {
        return name;
    }

    public String getDate() {
        return date;
    }

    public double getGross() {
        return gross;
    }

    public long getId() {
        return id;
    }
}
