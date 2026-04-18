package com.parkify.back.controller;

import com.parkify.back.dto.ActiveLevelDTO;
import com.parkify.back.dto.LotInfoDTO;
import com.parkify.back.dto.SpaceDTO;
import com.parkify.back.dto.SpotDTO;
import com.parkify.back.repository.ParkingLotsRepository;
import com.parkify.back.service.ParkingLotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/parkingLots")
public class ParkingLotsController {
    @Autowired
    private ParkingLotsRepository parkingLotsRepository;

    @Autowired
    private ParkingLotsService parkingLotsService;
    @PostMapping("/addSpots")
    public String add(@ModelAttribute SpotDTO spotDTO) {
        String message = parkingLotsService.addLot(spotDTO);
        if(message == "SUCCESS") {
            return message;
        }
        return "Error Occurred";
    }
    @GetMapping("/getLots/{id}")
    public List<LotInfoDTO> getLots(@PathVariable int id) {
        return parkingLotsRepository.getLotInfo(id);
    }
    @GetMapping("/getInfo/{id}")
    public List<SpaceDTO> getSpots(@PathVariable int id) {
        return parkingLotsRepository.getSpaceInfo(id);
    }
    @GetMapping("/getActiveParkingLot")
    public List<ActiveLevelDTO> getActiveParkingLot() {
        return parkingLotsRepository.getActiveLevel();
    }
}
