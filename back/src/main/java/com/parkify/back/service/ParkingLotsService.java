package com.parkify.back.service;

import com.parkify.back.dto.SpotDTO;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.ParkingLots;
import com.parkify.back.model.SpotStatus;
import com.parkify.back.model.Spots;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.repository.ParkingLotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ParkingLotsService {
    @Autowired
    private ParkingLotsRepository parkingLotsRepository;
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    public String addLot(SpotDTO spotDTO) {
        ParkingLots parkingLots = new ParkingLots();
        parkingLots.setPrice(spotDTO.getPrice());
        parkingLots.setLevel(spotDTO.getLevel());
        ParkingArea parkingArea = parkingAreaRepository.getById(spotDTO.getParkingArea());
        parkingLots.setParkingArea(parkingArea);
        List<Spots> spots = new ArrayList<>();
        for (int i = 1; i <= spotDTO.getSpots(); i++) {
            Spots spot = new Spots();
            spot.setParkingLots(parkingLots);
            spot.setSpotName("Spot " + "A" + i);
            spot.setSpotStatus(SpotStatus.Available);
            spots.add(spot);
        }
        parkingLots.setSpots(spots);
        parkingLotsRepository.save(parkingLots);
        return "SUCCESS";
    }
}
