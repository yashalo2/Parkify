package com.parkify.back.service;

import com.parkify.back.dto.*;
import com.parkify.back.model.Bookings;
import com.parkify.back.model.Payment;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    public String Pay(double pricePerHour, long bookingId) {
        Optional<Bookings> bookingOpt = bookingsRepository.findById(bookingId);
        if (!bookingOpt.isPresent()) {
            return "Booking not found";
        }
        Bookings booking = bookingOpt.get();
        Instant end = Instant.now();
        Instant start = booking.getBookingDate();
        Duration duration = Duration.between(start, end);
        double hours = duration.toMinutes() / 60.0;
        double amount = booking.getPrice() * hours;
        if(amount > pricePerHour) {
            return "Amount not enough";
        }

        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        paymentRepository.save(payment);
        return "Payment Successfully Made";
    }
    public List<CompareGrossDTO> getTopGrossing(){
        List<IdDTO> results = paymentRepository.getTopGrossing(Date.from(Instant.now()));
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();

        }
        return paymentRepository.getTopGrossing(top.getId());
    }
    public List<CompareGrossDTO> getLessGrossing(){
        List<IdDTO> results = paymentRepository.getLessGrossing(Date.from(Instant.now()));
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return paymentRepository.getLessGrossing(top.getId());
    }
    public List<CompareGrossDTO> getTopGrossingAllTime(){
        List<IdDTO> results = paymentRepository.getTopGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();

        }
        return paymentRepository.getTopGrossing(top.getId());
    }
    public List<CompareGrossDTO> getLessGrossingAllTime(){
        List<IdDTO> results = paymentRepository.getLessGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return paymentRepository.getLessGrossing(top.getId());
    }
    public List<CountInfoDTO> getLessCount(){
        List<IdDTO> results = paymentRepository.getLessGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return paymentRepository.getCountInfo(top.getId());
    }
    public List<CountInfoDTO> getTopCount(){
        List<IdDTO> results = paymentRepository.getTopGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return paymentRepository.getCountInfo(top.getId());
    }
    public AreaDTO getTopArea(){
        List<IdDTO> results = paymentRepository.getTopGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return null;
        }
        return paymentRepository.getAreaInfo(top.getId());
    }
    public AreaDTO getLessArea(){
        List<IdDTO> results = paymentRepository.getLessGrossingAllTime();
        IdDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return null;
        }
        return paymentRepository.getAreaInfo(top.getId());
    }
    public List<HeatMapDTO> getTopHeatMap(){
        List<GoldenUserDTO> results = paymentRepository.getGoldenUser();
        GoldenUserDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return paymentRepository.getHeatMapInfo(top.getId());
    }

}
