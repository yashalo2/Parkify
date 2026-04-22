package com.parkify.back.repository;

import com.parkify.back.model.EntranceScanner;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntranceScannerRepository extends JpaRepository<EntranceScanner, Long> {
}
