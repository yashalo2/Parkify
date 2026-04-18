package com.parkify.back.dto;

import java.sql.Date;

public class IdDTO {
    private int id;
    private String name;
    private String date;
    private double gross;
    public IdDTO(int id,String name, Date date, Double gross) {
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

    public int getId() {
        return id;
    }
}
