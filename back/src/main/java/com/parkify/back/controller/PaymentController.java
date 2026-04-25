package com.parkify.back.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.parkify.back.dto.ChartDTO;
import com.parkify.back.dto.CompareGrossDTO;
import com.parkify.back.dto.PaymentInfoDTO;
import com.parkify.back.model.*;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.PaymentService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.util.Base64;
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
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/pay/{booking}")
    public ResponseEntity<?> pay(@RequestBody Payment payment, @PathVariable long booking) {
        return ResponseEntity.ok().body(paymentService.Pay(payment.getAmount(), booking));
    }

    @GetMapping("/getChartInfo")
    public List<ChartDTO> getChartInfo() {
        return paymentRepository.groupPaymentsByDay();
    }

    @GetMapping("/getTopGrossing")
    public List<CompareGrossDTO> getTopGrossing() {
        return paymentService.getTopGrossing();
    }

    @GetMapping("/getLessGrossing")
    public List<CompareGrossDTO> getLessGrossing() {
        return paymentService.getLessGrossing();
    }

    @GetMapping("getPayments")
    public List<PaymentInfoDTO> getPayments() {
        return paymentRepository.getPaymentInfo();
    }
    @GetMapping("/getMyBooking/{status}")
    public ResponseEntity<?> getMyBooking(@PathVariable String status ,HttpSession session){
        long id = (long) session.getAttribute("id");
        String email = (String) session.getAttribute("email");
        if(email == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        User user = userRepository.findByEmail(email);
        if(status.equals(BookingStatus.Open.toString())){
            return ResponseEntity.ok().body(bookingsRepository.getBookings(user.getId(),BookingStatus.Open));

        }
        if(status.equals(BookingStatus.Used.toString())){
            return ResponseEntity.ok().body(bookingsRepository.getBookings(user.getId(),BookingStatus.Used));

        }if(status.equals(BookingStatus.Cancelled.toString())){
            return ResponseEntity.ok().body(bookingsRepository.getBookings(user.getId(),BookingStatus.Cancelled));
        }
        return ResponseEntity.ok().body(bookingsRepository.getBooking(user.getId()));


    }

}
