package com.parkify.back.controller;

import com.parkify.back.dto.AreaDTO;
import com.parkify.back.dto.LocationDTO;
import com.parkify.back.dto.SpotDTO;
import com.parkify.back.dto.UserAreaInfoDTO;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.SpotStatus;
import com.parkify.back.repository.ParkingAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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


}
