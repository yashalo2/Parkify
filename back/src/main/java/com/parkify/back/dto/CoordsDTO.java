package com.parkify.back.dto;

public class CoordsDTO {
    private double lat;
    private double lon;

    public CoordsDTO(double lat, double lon) {
        this.lat = lat;
        this.lon = lon;
    }

    public double getLat() {
        return lat;
    }

    public double getLon() {
        return lon;
    }
}
