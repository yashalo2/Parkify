package com.parkify.back.repository;

import com.parkify.back.model.ParkingLots;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParkingLotsRepository extends JpaRepository<ParkingLots, Integer> {
}
