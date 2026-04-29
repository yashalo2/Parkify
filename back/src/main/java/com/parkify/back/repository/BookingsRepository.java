package com.parkify.back.repository;
import com.parkify.back.dto.*;
import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.Bookings;
import com.parkify.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingsRepository extends JpaRepository<Bookings, Long> {
    @Query("""
select case when count(b) > 0 then true else false end
from Bookings b
where b.user.id = :userId
""")
    boolean hasBooking(@Param("userId") Long userId);

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
 where b.user.id = :id and b.status = :status
""")
    List<GetBookingDTO> getBookings(@Param("id") long id,@Param("status") BookingStatus status);
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
    List<GetBookingDTO> getBooking(@Param("id") long id);

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
    @Query("""
select new com.parkify.back.dto.UserBookingHistoryDTO(
    count(b),
    sum(case when b.bookingDate between :weekStart and :weekEnd then 1 else 0 end),
    sum(case when b.bookingDate between :monthStart and :monthEnd then 1 else 0 end)
)
from Bookings b
where b.user.id = :id
""")
    UserBookingHistoryDTO getBookingStats(
            @Param("weekStart") Instant weekStart,
            @Param("weekEnd") Instant weekEnd,
            @Param("monthStart") Instant monthStart,
            @Param("monthEnd") Instant monthEnd,
            @Param("id") long id
    );

    @Query("""
select new com.parkify.back.dto.UserBookingHistoryDTO(
    count(b),
    sum(case when b.bookingDate between :weekStart and :weekEnd then 1 else 0 end),
    sum(case when b.bookingDate between :monthStart and :monthEnd then 1 else 0 end)
)
from Bookings b
where b.user.id = :id and b.status = :status
""")
    UserBookingHistoryDTO getBookingStatus(
            @Param("weekStart") Instant weekStart,
            @Param("weekEnd") Instant weekEnd,
            @Param("monthStart") Instant monthStart,
            @Param("monthEnd") Instant monthEnd,
            @Param("id") long id,
            @Param("status") BookingStatus status
    );
    @Query("""
select new com.parkify.back.dto.UserBookingsDTO(
    b.bookingDate,
    b.spot.parkingLots.parkingArea.name,
    b.spot.parkingLots.level,
    b.spot.spotName
)
from Bookings b
where b.user.id = :id
""")
    List<UserBookingsDTO> getUserBookings(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.UserBookingsDTO(
    b.bookingDate,
    b.spot.parkingLots.parkingArea.name,
    b.spot.parkingLots.level,
    b.spot.spotName
)
from Bookings b
where b.user.id = :id and b.status = :status
""")
    List<UserBookingsDTO> getUserBookingsByStatus(@Param("id") long id, @Param("status") BookingStatus status);
    @Query("""
select new com.parkify.back.dto.ChartDTO(
b.bookingDate,
count (*)
)
from Bookings b
where b.spot.parkingLots.parkingArea.id = :id and b.status = :status
group by b.bookingDate
""")
    List<ChartDTO> getAreaBooking(@Param("id") long id,@Param("status") BookingStatus status);
    @Query("""
select new com.parkify.back.dto.AreaBookingDTO(
b.user.email,
b.bookingDate,
b.status
)
from Bookings b
where b.spot.parkingLots.parkingArea.id = :id
""")
    List<AreaBookingDTO> getAreaAllBooking(@Param("id") long id);
    @Query("""
select new com.parkify.back.dto.AreaBookingDTO(
b.user.email,
b.bookingDate,
b.status
)
from Bookings b
where b.spot.parkingLots.parkingArea.id = :id and b.user.email like %:email%
""")
    List<AreaBookingDTO> getAreaBookingByEmail(@Param("email") String email, @Param("id") long id);
    @Query("""
select new com.parkify.back.dto.ActiveBookingUsersDTO(
    b.user.id,
    count(b),
    sum(case when b.bookingDate between :weekStart and :weekEnd then 1 else 0 end),
    sum(case when b.bookingDate between :monthStart and :monthEnd then 1 else 0 end)
)
from Bookings b
group by b.user.id
""")
    ActiveBookingUsersDTO getActiveBookingUsers(
            @Param("weekStart") Instant weekStart,
            @Param("weekEnd") Instant weekEnd,
            @Param("monthStart") Instant monthStart,
            @Param("monthEnd") Instant monthEnd
    );
    @Query("""
select new com.parkify.back.dto.CountInfoDTO(
Count(*),
b.status
)
from Bookings b
group by b.status
""")
    List<CountInfoDTO> getAllTimeCountInfo();
    @Query("""
select new com.parkify.back.dto.CountInfoDTO(
Count(*),
b.status
)
from Bookings b
where b.user.id = :id
group by b.status
""")
    List<CountInfoDTO> getGoldenUserBookingHistory(@Param("id") long id);
}
