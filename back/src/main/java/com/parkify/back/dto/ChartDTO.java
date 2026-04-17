package com.parkify.back.dto;

import java.time.Instant;
import java.time.LocalDate;

public class ChartDTO {
    private double gross;
    private String date;

    public ChartDTO(Instant date, double gross) {
        this.date = date.toString();
        this.gross = gross;
    }

    public double getGross() {
        return gross;
    }
    public String getDate() {
        return date;
    }




}
