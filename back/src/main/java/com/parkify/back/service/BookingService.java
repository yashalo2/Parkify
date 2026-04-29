package com.parkify.back.service;

import com.parkify.back.dto.*;
import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.User;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import com.parkify.back.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private PaymentRepository paymentRepository;

    public List<ChartDTO> getBooked() {
        return bookingsRepository.getChart(BookingStatus.Open);
    }
    public List<ChartDTO> getCancelled() {
        return bookingsRepository.getChart(BookingStatus.Cancelled);
    }
    public UserBookingHistoryDTO getBookingHistory(long id) {
        Instant startTime = Instant.now();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zoneId);
        LocalDate WeekStartDate = today.with(DayOfWeek.MONDAY);
        LocalDate WeekEndDate = today.with(DayOfWeek.SUNDAY);
        Instant startWeekStartTime = WeekStartDate.atStartOfDay().atZone(zoneId).toInstant();
        Instant weekEnd=WeekEndDate.atStartOfDay().atZone(zoneId).toInstant();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);
        Instant monthStartTime = monthStart.atStartOfDay().atZone(zoneId).toInstant();
        Instant monthEndTime = monthEnd.atTime(LocalTime.MAX).atZone(zoneId).toInstant();
        if(!bookingsRepository.hasBooking(id)){
            long value=0;
            UserBookingHistoryDTO booking = new UserBookingHistoryDTO(value,value,value);
            return booking;

        }
        return bookingsRepository.getBookingStats(startWeekStartTime,weekEnd,monthStartTime,monthEndTime,id);
    }
    public UserBookingHistoryDTO getUsedBooking(long id) {
        Instant startTime = Instant.now();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zoneId);
        LocalDate WeekStartDate = today.with(DayOfWeek.MONDAY);
        LocalDate WeekEndDate = today.with(DayOfWeek.SUNDAY);
        Instant startWeekStartTime = WeekStartDate.atStartOfDay().atZone(zoneId).toInstant();
        Instant weekEnd=WeekEndDate.atStartOfDay().atZone(zoneId).toInstant();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);
        Instant monthStartTime = monthStart.atStartOfDay().atZone(zoneId).toInstant();
        Instant monthEndTime = monthEnd.atTime(LocalTime.MAX).atZone(zoneId).toInstant();
        if(!bookingsRepository.hasBooking(id)){
            long value=0;
            UserBookingHistoryDTO booking = new UserBookingHistoryDTO(value,value,value);
            return booking;

        }
        return bookingsRepository.getBookingStatus(startWeekStartTime,weekEnd,monthStartTime,monthEndTime,id,BookingStatus.Used);
    }
    public UserBookingHistoryDTO getCancelledBooking(long id) {
        Instant startTime = Instant.now();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zoneId);
        LocalDate WeekStartDate = today.with(DayOfWeek.MONDAY);
        LocalDate WeekEndDate = today.with(DayOfWeek.SUNDAY);
        Instant startWeekStartTime = WeekStartDate.atStartOfDay().atZone(zoneId).toInstant();
        Instant weekEnd=WeekEndDate.atStartOfDay().atZone(zoneId).toInstant();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);
        Instant monthStartTime = monthStart.atStartOfDay().atZone(zoneId).toInstant();
        Instant monthEndTime = monthEnd.atTime(LocalTime.MAX).atZone(zoneId).toInstant();
        if(!bookingsRepository.hasBooking(id)){
            long value=0;
            UserBookingHistoryDTO booking = new UserBookingHistoryDTO(value,value,value);
            return booking;

        }
        return bookingsRepository.getBookingStatus(startWeekStartTime,weekEnd,monthStartTime,monthEndTime,id,BookingStatus.Cancelled);
    }
    public List<UserBookingsDTO> getAllBookings(@PathVariable long id) {
        if(!bookingsRepository.hasBooking(id)){
            long value=0;
            ArrayList<UserBookingsDTO> list = new ArrayList<>();
            return list;
        }
        return bookingsRepository.getUserBookings(id);
    }
    public List<UserBookingsDTO> getAllCancelledBookings(@PathVariable long id) {
        if(!bookingsRepository.hasBooking(id)){
            ArrayList<UserBookingsDTO> list = new ArrayList<>();
            return list;
        }
        return bookingsRepository.getUserBookingsByStatus(id,BookingStatus.Cancelled);
    }
    public List<UserBookingsDTO> getAllUsedBookings(@PathVariable long id) {
        if(!bookingsRepository.hasBooking(id)){
            ArrayList<UserBookingsDTO> list = new ArrayList<>();
            return list;
        }
        return bookingsRepository.getUserBookingsByStatus(id,BookingStatus.Used);
    }
    public ActiveBookingUsersDTO getActiveBookingUsers() {
        Instant startTime = Instant.now();
        ZoneId zoneId = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zoneId);
        LocalDate WeekStartDate = today.with(DayOfWeek.MONDAY);
        LocalDate WeekEndDate = today.with(DayOfWeek.SUNDAY);
        Instant startWeekStartTime = WeekStartDate.atStartOfDay().atZone(zoneId).toInstant();
        Instant weekEnd=WeekEndDate.atStartOfDay().atZone(zoneId).toInstant();
        LocalDate monthStart = today.withDayOfMonth(1);
        LocalDate monthEnd = monthStart.plusMonths(1).minusDays(1);
        Instant monthStartTime = monthStart.atStartOfDay().atZone(zoneId).toInstant();
        Instant monthEndTime = monthEnd.atTime(LocalTime.MAX).atZone(zoneId).toInstant();
        return bookingsRepository.getActiveBookingUsers(startWeekStartTime,weekEnd,monthStartTime,monthEndTime);
    }
    public List<CountInfoDTO> getGoldenUserBookingHistory(){
        List<GoldenUserDTO> results = paymentRepository.getGoldenUser();
        GoldenUserDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return bookingsRepository.getGoldenUserBookingHistory(top.getId());
    }
}
