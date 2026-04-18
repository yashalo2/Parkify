package com.parkify.back.repository;

import com.parkify.back.dto.ChartDTO;
import com.parkify.back.dto.CompareGrossDTO;
import com.parkify.back.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    @Query(""" 
            SELECT new com.parkify.back.dto.ChartDTO(
            p.date,
            p.amount
            )
            FROM Payment p
""")
    List<ChartDTO> groupPaymentsByDay();
    @Query("""
 select new com.parkify.back.dto.CompareGrossDTO(
 p.booking.spot.parkingLots.parkingArea.name,
 cast(p.date as date),
 sum(p.amount)
 
 )
 from Payment p
 join p.booking b
 join b.spot s
 join s.parkingLots pl
 join pl.parkingArea pa
 group by pa.name,function('DATE',p.date)
 order by cast(p.date as date ),sum(p.amount) desc
""")
    List<CompareGrossDTO> getTopGrossing();
    @Query("""
 select new com.parkify.back.dto.CompareGrossDTO(
 pa.name,
 cast(p.date as date),
 sum(p.amount)
 
 )
 from Payment p
 join p.booking b
 join b.spot s
 join s.parkingLots pl
 join pl.parkingArea pa
 group by pa.name,function('DATE',p.date)
 order by cast(p.date as date ),sum(p.amount) asc
""")
    List<CompareGrossDTO> getLessGrossing();


}
