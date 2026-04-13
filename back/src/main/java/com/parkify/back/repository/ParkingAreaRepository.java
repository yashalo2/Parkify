package com.parkify.back.repository;

import com.parkify.back.dto.LocationDTO;
import com.parkify.back.model.ParkingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Integer> {
    @Query("""
 select new com.parkify.back.dto.LocationDTO(
 a.name,
 a.latitude,
 a.longitude,
 a.id
 
 )
 from ParkingArea a
""")
    List<LocationDTO> getLocations();
}
