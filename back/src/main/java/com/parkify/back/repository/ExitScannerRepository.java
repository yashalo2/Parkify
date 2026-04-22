package com.parkify.back.repository;

import com.parkify.back.model.ExitScanner;
import com.parkify.back.model.ParkingArea;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExitScannerRepository extends JpaRepository<ExitScanner, Long> {
}
