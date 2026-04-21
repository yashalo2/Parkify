package com.parkify.back.repository;

import com.parkify.back.dto.ChartDTO;
import com.parkify.back.dto.CompareGrossDTO;
import com.parkify.back.dto.IdDTO;
import com.parkify.back.dto.PaymentInfoDTO;
import com.parkify.back.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.Date;
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
 select new com.parkify.back.dto.IdDTO(
    pa.id,
    pa.name,
 cast(p.date as date),
 sum(p.amount)
 )
 from Payment p
 join p.booking b
 join b.spot s
 join s.parkingLots pl
 join pl.parkingArea pa
 where cast(p.date as date) = :today
 group by pa.name,function('DATE',p.date),pa.id
 order by cast(p.date as date ),sum(p.amount) desc
""")
    List<IdDTO> getTopGrossing(@Param("today") Date today);
    @Query("""
 select new com.parkify.back.dto.IdDTO(
 pa.id,
 pa.name,
 cast(p.date as date),
 sum(p.amount)
 
 )
 from Payment p
 join p.booking b
 join b.spot s
 join s.parkingLots pl
 join pl.parkingArea pa
 where cast(p.date as date ) = :today
 group by pa.name,cast(p.date as date),pa.id
 order by cast(p.date as date ),sum(p.amount) asc
""")
    List<IdDTO> getLessGrossing(@Param("today")  Date today);
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
 where pa.id = :id
 group by pa.name,function('DATE',p.date)
 order by cast(p.date as date ),sum(p.amount) desc
""")
    List<CompareGrossDTO> getTopGrossing(@Param("id") long id);
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
 where pa.id = :id
 group by pa.name,function('DATE',p.date)
 order by cast(p.date as date ),sum(p.amount) asc
""")
    List<CompareGrossDTO> getLessGrossing(@Param("id") long id);
    @Query("""
     select new com.parkify.back.dto.PaymentInfoDTO(
     p.id,
     u.email,
     pl.level,
     s.spotName,
     pl.price,
     p.amount,
     p.date,
     pl.parkingArea.name
     )
     from Payment p
     join p.booking b
     join b.spot s
     join s.parkingLots pl
     join b.user u
""")
    List<PaymentInfoDTO> getPaymentInfo();

}
