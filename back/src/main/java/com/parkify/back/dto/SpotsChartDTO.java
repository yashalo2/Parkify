package com.parkify.back.dto;

public class SpotsChartDTO {
    private String area;
    private long number;
    private long id;

    public SpotsChartDTO(String area, long number,long id) {
        this.area = area;
        this.number = number;
        this.id = id;
    }

    public String getArea() {
        return area;
    }

    public long getNumber() {
        return number;
    }
}
