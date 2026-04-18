package com.parkify.back.controller;

import com.parkify.back.dto.*;
import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.SpotStatus;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.service.ParkingAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/parkingArea")
public class ParkingAreaController {
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    @Autowired
    private ParkingAreaService parkingAreaService;
    @GetMapping("/getLocations")
    public List<LocationDTO> getLocations() {
         return parkingAreaRepository.getLocations();
     }
     @GetMapping("/getParkingArea")
    public List<ParkingArea> getSpots() {
        return parkingAreaRepository.findAll();
     }
     @GetMapping("/getArea/{id}")
    public List<AreaDTO> getArea(@PathVariable long id) {
        return parkingAreaRepository.getArea(id);
    }
    @GetMapping("/getAreaInfo/{id}")
    public List<UserAreaInfoDTO> getAreaInfo(@PathVariable long id) {
        return parkingAreaRepository.getUserAreaInfo(SpotStatus.Available,SpotStatus.Occupied,SpotStatus.Reserved,id);
    }
    @GetMapping("/getAvailableSpots")
    public ResponseEntity<?> getAvailableSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getAvailableSpots());
    }
    @GetMapping("/getReservedSpots")
    public ResponseEntity<?> getReservedSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getReservedSpots());
    }
    @GetMapping("/getOccupiedSpots")
    public ResponseEntity<?> getOccupiedSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getOccupiedSpots());
    }
    @GetMapping("/getActiveParkingArea")
    public List<ActiveAreaDTO> getActiveParkingArea() {
        return parkingAreaRepository.getActiveArea();
    }


}
