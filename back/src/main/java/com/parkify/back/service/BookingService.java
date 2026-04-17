package com.parkify.back.service;

import com.parkify.back.dto.ChartDTO;
import com.parkify.back.model.BookingStatus;
import com.parkify.back.repository.BookingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingsRepository bookingsRepository;
    public List<ChartDTO> getBooked() {
        return bookingsRepository.getChart(BookingStatus.Open);
    }
    public List<ChartDTO> getCancelled() {
        return bookingsRepository.getChart(BookingStatus.Cancelled);
    }
}
