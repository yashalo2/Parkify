package com.parkify.back.controller;

import com.parkify.back.dto.LocationDTO;
import com.parkify.back.repository.ParkingAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/parkingArea")
public class ParkingAreaController {
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    @GetMapping("/getLocations")
    public List<LocationDTO> getLocations() {
         return parkingAreaRepository.getLocations();
     }
}
