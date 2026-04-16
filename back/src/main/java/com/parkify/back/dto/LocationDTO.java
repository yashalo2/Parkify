package com.parkify.back.dto;

public class LocationDTO {
    private String locationName;
    private double latitude;
    private double longitude;
    private long id;

    public String getLocationName() {
        return locationName;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public long getId() {
        return id;
    }

    public LocationDTO(String locationName, double latitude, double longitude, long id) {
        this.locationName = locationName;
        this.latitude = latitude;
        this.longitude = longitude;
        this.id = id;
    }
}
