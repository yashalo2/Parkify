package com.parkify.back.service;

import com.parkify.back.dto.CompareGrossDTO;
import com.parkify.back.dto.IdDTO;
import com.parkify.back.model.Bookings;
import com.parkify.back.model.Payment;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    public ResponseEntity<?> Pay(double pricePerHour, long bookingId) {
        Optional<Bookings> bookingOpt = bookingsRepository.findById(bookingId);
        if (!bookingOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Booking not found");
        }
        Bookings booking = bookingOpt.get();
        Instant end = Instant.now();
        Instant start = booking.getBookingDate();
        Duration duration = Duration.between(start, end);
        double hours = duration.toMinutes() / 60.0;
        double amount = booking.getPrice() * hours;
        if(amount > pricePerHour) {
            return ResponseEntity.ok().body("Amount not enough");
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        paymentRepository.save(payment);
        return ResponseEntity.ok().body(payment);
    }
    public List<CompareGrossDTO> getTopGrossing(){
        List<IdDTO> results = paymentRepository.getTopGrossing(Date.from(Instant.now()));
        IdDTO top = results.isEmpty() ? null : results.get(0);
        return paymentRepository.getTopGrossing(top.getId());
    }
    public List<CompareGrossDTO> getLessGrossing(){
        List<IdDTO> results = paymentRepository.getLessGrossing(Date.from(Instant.now()));
        IdDTO top = results.isEmpty() ? null : results.get(0);
        return paymentRepository.getLessGrossing(top.getId());
    }

}
