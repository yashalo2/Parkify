package com.parkify.back.repository;

import com.parkify.back.model.CancelBooking;
import com.parkify.back.model.RePay;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RePayRepository extends JpaRepository<RePay,Long> {
    @Query("""
select p from RePay p
""")
    RePay getAll();
}
