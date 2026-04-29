package com.parkify.back.repository;

import com.parkify.back.model.EntranceScanner;
import com.parkify.back.model.ParkingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EntranceScannerRepository extends JpaRepository<EntranceScanner, Long> {
    @Query("""
    select e from EntranceScanner e where e.parkingArea.id = :id
""")
    EntranceScanner findByParkingAreaId(@Param("id") Long id);
    @Query("""
    select e from EntranceScanner e where e.code = :code
""")
    EntranceScanner codeExists(@Param("code") String code);
}
