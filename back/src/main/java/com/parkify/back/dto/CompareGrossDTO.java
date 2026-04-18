package com.parkify.back.dto;

import javax.xml.crypto.Data;
import java.sql.Date;
import java.time.LocalDate;

public class CompareGrossDTO {
    private String name;
    private String date;
    private double gross;

    public CompareGrossDTO(String name, Date date, Double gross) {
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
}
