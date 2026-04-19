package com.parkify.back.repository;
import com.parkify.back.dto.ChartDTO;
import com.parkify.back.dto.GetBookingDTO;
import com.parkify.back.dto.ReceiptDTO;
import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.Bookings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    @Query("""
 select new com.parkify.back.dto.GetBookingDTO(
 b.id,
 b.bookingDate,
 b.status,
 p.name,
 pa.level,
 s.spotName,
 pa.price
 
 )
 from Bookings b
 join b.spot s
 join s.parkingLots pa
 join pa.parkingArea p
 where b.user.id = :id
""")
    List<GetBookingDTO> getBookings(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.ReceiptDTO(
b.id,
p.name,
pa.level,
s.spotName,
pa.price,
b.bookingDate,
b.status


)
from Bookings b
join b.spot s
join s.parkingLots pa
join pa.parkingArea p
where b.id = :id
""")
    List<ReceiptDTO> getReceipts(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.ChartDTO(
b.bookingDate,
COUNT(*)
)
from Bookings b
where b.status = :status
group by b.bookingDate
""")
    List<ChartDTO> getChart(@Param("status") BookingStatus status);
}
