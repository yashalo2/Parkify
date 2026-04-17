package com.parkify.back.repository;

import com.parkify.back.dto.ChartDTO;
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


}
