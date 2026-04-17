package com.parkify.back.service;
import com.parkify.back.dto.SpotsChartDTO;
import com.parkify.back.model.SpotStatus;
import com.parkify.back.repository.ParkingAreaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ParkingAreaService {
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    public List<SpotsChartDTO> getAvailableSpots(){
        return parkingAreaRepository.getSpotsChart(SpotStatus.Available);
    }
    public List<SpotsChartDTO> getReservedSpots(){
        return parkingAreaRepository.getSpotsChart(SpotStatus.Reserved);
    }
    public List<SpotsChartDTO> getOccupiedSpots(){
        return parkingAreaRepository.getSpotsChart(SpotStatus.Occupied);
    }
}
