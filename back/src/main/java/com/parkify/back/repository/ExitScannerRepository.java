package com.parkify.back.repository;

import com.parkify.back.model.ExitScanner;
import com.parkify.back.model.ParkingArea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ExitScannerRepository extends JpaRepository<ExitScanner, Long> {
    @Query("""
    select e from ExitScanner e where e.parkingArea.id = :id
""")
    ExitScanner findByParkingAreaId(@Param("id") Long id);
    @Query("""
    select e from ExitScanner e where e.code = :code
""")
    ExitScanner codeExists(@Param("code") String code);

}
