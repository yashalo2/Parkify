package com.parkify.back.repository;

import com.parkify.back.dto.*;
import com.parkify.back.model.Payment;
import com.parkify.back.model.PaymentStatus;
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
    @Query("""
 select new com.parkify.back.dto.GetBookingDTO(
 py.id,
 py.date,
 b.status,
 p.name,
 pa.level,
 s.spotName,
 pa.price
 )
 from Payment py
 join py.booking b
 join b.spot s
 join s.parkingLots pa
 join pa.parkingArea p
 where b.user.id = :id and py.status = :status
""")
    List<GetBookingDTO> getBookingInfo(@Param("id") long id,@Param("status") PaymentStatus status);
    @Query("""
 select new com.parkify.back.dto.GetBookingDTO(
 py.id,
 b.bookingDate,
 b.status,
 p.name,
 pa.level,
 s.spotName,
 pa.price
 )
 from Payment py
 join py.booking b
 join b.spot s
 join s.parkingLots pa
 join pa.parkingArea p
 where b.user.id = :id
""")
    List<GetBookingDTO> getPayment(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.ChartDTO(
    p.date,
    p.amount

)
from Payment p
where p.booking.spot.parkingLots.parkingArea.id = :id
""")
    List<ChartDTO> getChart(@Param("id") long id);
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
 group by pa.name,function('DATE',p.date),pa.id
 order by cast(p.date as date ),sum(p.amount) desc
""")
    List<IdDTO> getTopGrossingAllTime();
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
 group by pa.name,cast(p.date as date),pa.id
 order by cast(p.date as date ),sum(p.amount) asc
""")
    List<IdDTO> getLessGrossingAllTime();
    @Query("""
select new com.parkify.back.dto.CountInfoDTO(
Count(*),
b.status
)
from Bookings b
where b.spot.parkingLots.parkingArea.id = :id
group by b.status
""")
    List<CountInfoDTO> getCountInfo(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.AreaDTO(
    p.booking.spot.parkingLots.parkingArea.name,
    p.booking.spot.parkingLots.parkingArea.id
)
from Payment p
where p.booking.spot.parkingLots.parkingArea.id = :id
group by p.booking.spot.parkingLots.parkingArea.id,p.booking.spot.parkingLots.parkingArea.name
""")
    AreaDTO getAreaInfo(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.GoldenUserDTO(
p.booking.user.id,
count(*)
)
from Payment p
group by p.booking.user.id
order by count(*) desc
""")
    List<GoldenUserDTO> getGoldenUser();
    @Query("""
select new com.parkify.back.dto.HeatMapDTO(
    p.date,
    count(*)
)
from Payment p
where p.booking.user.id = :id
group by p.date
""")
    List<HeatMapDTO> getHeatMapInfo(@Param("id") long id);

}
