package com.parkify.back.repository;

import com.parkify.back.dto.LotInfoDTO;
import com.parkify.back.model.ParkingLots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingLotsRepository extends JpaRepository<ParkingLots, Long> {

    @Query("""
 select new com.parkify.back.dto.LotInfoDTO(
 p.level,
 size(p.spots),
 p.price
 
 )
 from ParkingLots p
 where p.parkingArea.id = :id
""")
    List<LotInfoDTO> getLotInfo(@Param("id") long id);
}
