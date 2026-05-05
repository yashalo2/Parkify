package com.parkify.back.repository;

import com.parkify.back.model.CancelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CancelBookingRepository extends JpaRepository<CancelBooking,Long> {
    @Query("""
select b from CancelBooking b
""")
    CancelBooking getAll();
}
