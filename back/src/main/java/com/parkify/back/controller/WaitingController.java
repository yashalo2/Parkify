package com.parkify.back.controller;

import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.User;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/waiting")
public class WaitingController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingsRepository bookingsRepository;

    @GetMapping("/getMyBooking/{status}")
    public ResponseEntity<?> getMyBooking(@PathVariable String status , HttpSession session){
        long id = (long) session.getAttribute("id");
        String email = (String) session.getAttribute("email");
        if(email == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        User user = userRepository.findByEmail(email);
        return ResponseEntity.ok().body(bookingsRepository.getWaitingBookings(user.getId(),BookingStatus.Used));

    }
    @GetMapping("/getBooking/{id}")
    public ResponseEntity<?> getBooking(@PathVariable long id){
        return ResponseEntity.ok().body(bookingsRepository.getReceipts(id));
    }

}
