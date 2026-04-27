package com.parkify.back.repository;

import com.parkify.back.dto.*;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.SpotStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParkingAreaRepository extends JpaRepository<ParkingArea, Long> {
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
    @Query("""
     select new com.parkify.back.dto.AreaDTO(
     a.name,
     a.id
     
     )
     from ParkingArea a
     where a.id = :id
""")
    List<AreaDTO> getArea(@Param("id") long id);
    @Query("""
 SELECT new com.parkify.back.dto.UserAreaInfoDTO(
                     p.id,
                     p.name,
                     MIN(pa.price),
                     MAX(pa.price),
                     SUM(CASE WHEN s.spotStatus = :available THEN 1 ELSE 0 END),
                     SUM(CASE WHEN s.spotStatus = :occupied THEN 1 ELSE 0 END),
                     SUM(CASE WHEN s.spotStatus = :reserved THEN 1 ELSE 0 END)
                 )
                 FROM ParkingArea p
                 JOIN p.parkingLots pa
                 JOIN pa.spots s
                 WHERE p.id = :id
                 GROUP BY p.id, p.name
                 
""")
    List<UserAreaInfoDTO> getUserAreaInfo(@Param("available") SpotStatus a, @Param("occupied") SpotStatus c, @Param("reserved") SpotStatus r ,@Param("id") long id);
    @Query("""
 select new com.parkify.back.dto.SpotsChartDTO(
 p.name,
 count (s),
 p.id
 
 )
 from ParkingArea p
 join p.parkingLots pa
 join pa.spots s
 where s.spotStatus = :status
 group by p.id
""")
    List<SpotsChartDTO> getSpotsChart(@Param("status") SpotStatus status);
    @Query("""
        select new com.parkify.back.dto.ActiveAreaDTO(
        count(p),
        p.areaStatus
        )
        from ParkingArea p
        group by p.areaStatus
""")
    List<ActiveAreaDTO> getActiveArea();
    @Query("""
select new com.parkify.back.dto.ManageAreaDTO(
    p.id,
    p.name,
    count(pa),
    p.areaStatus
)
from ParkingArea p
left join p.parkingLots pa
group by p.id, p.areaStatus
""")

    List<ManageAreaDTO> getManageArea();
    @Query("""
select new com.parkify.back.dto.ManageAreaDTO(
    p.id,
    p.name,
    count(pa),
    p.areaStatus
)
from ParkingArea p
left join p.parkingLots pa
where p.name like %:name%
group by p.id, p.areaStatus

""")
    List<ManageAreaDTO> search(@Param("name") String name);
    @Query("""
 select new com.parkify.back.dto.LocationDTO(
 a.name,
 a.latitude,
 a.longitude,
 a.id
 
 )
 from ParkingArea a
 where a.name like %:name%
""")
    List<LocationDTO> searchLocation(@Param("name") String name);
    @Query("""
 select new com.parkify.back.dto.CoordsDTO(
 p.latitude,
 p.longitude
 
 )
 FROM ParkingArea p
 where p.id = :id
""")
    List<CoordsDTO> getCoords(@Param("id") long id);
}
