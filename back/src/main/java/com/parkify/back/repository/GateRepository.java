package com.parkify.back.repository;

import com.parkify.back.model.Gate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GateRepository extends JpaRepository<Gate, Long> {
    @Query("""
    select e from Gate e where e.parkingArea.id = :id
""")
    Gate findByParkingAreaId(@Param("id") Long id);
    @Query("""
    select e from Gate e where e.code = :code
""")
    Gate codeExists(@Param("code") String code);
    @Query("""
 select p.id from Gate g
 join g.parkingArea p
 where g.code = :code
""")
    long getAreaId(@Param("code") String code);
    @Query("""
select p.name from Gate g
join g.parkingArea p
where g.code = :code
""")
    String getName(@Param("code") String code);
}
