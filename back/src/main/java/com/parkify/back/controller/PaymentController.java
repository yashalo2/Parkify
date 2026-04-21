package com.parkify.back.controller;

import com.parkify.back.dto.ChartDTO;
import com.parkify.back.dto.CompareGrossDTO;
import com.parkify.back.dto.PaymentInfoDTO;
import com.parkify.back.model.Bookings;
import com.parkify.back.model.Payment;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import com.parkify.back.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @PostMapping("/pay/{booking}")
    public ResponseEntity<?> pay(@RequestBody Payment payment,@PathVariable long booking){
        return ResponseEntity.ok().body(paymentService.Pay(payment.getAmount(),booking));
    }
    @GetMapping("/getChartInfo")
    public List<ChartDTO> getChartInfo(){
        return paymentRepository.groupPaymentsByDay();
    }
    @GetMapping("/getTopGrossing")
    public List<CompareGrossDTO> getTopGrossing(){
        return paymentService.getTopGrossing();
    }
    @GetMapping("/getLessGrossing")
    public List<CompareGrossDTO> getLessGrossing(){
        return paymentService.getLessGrossing();
    }
    @GetMapping("getPayments")
    public List<PaymentInfoDTO> getPayments(){
        return paymentRepository.getPaymentInfo();
    }
}
