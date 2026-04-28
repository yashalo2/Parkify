package com.parkify.back.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.encoder.QRCode;
import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.SpotsRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.BookingService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/booking")
public class BookingController {
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private SpotsRepository spotsRepository;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/book")
    public ResponseEntity<?> book(@ModelAttribute Bookings bookings, HttpSession session) throws WriterException, IOException {
        String email = (String) session.getAttribute("email");
        if(email == null){
            System.out.println(email);
            return ResponseEntity.ok().body("user not logged in");
        }
        User user = userRepository.findByEmail(email);
        Spots spots = bookings.getSpot();
        spots.setSpotStatus(SpotStatus.Reserved);
        spotsRepository.save(spots);
        bookings.setUser(user);
        Bookings booking = bookingsRepository.save(bookings);
        String qrContent = "{\"bookingId\":" + booking.getId();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE,250,250);
        BufferedImage qrImage = new BufferedImage(250,250, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < 250; x++) {
            for (int y = 0; y < 250; y++) {
                int pixel = bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF;
                qrImage.setRGB(x, y, pixel);
            }
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "png", byteArrayOutputStream);
        String base64Image = Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray());
        return ResponseEntity.ok().body(base64Image);

    }
    @GetMapping("/getEntrance/{id}")
    public ResponseEntity<?> getEntrance(@PathVariable long id) throws WriterException, IOException {
        String qrContent = "{\"bookingId\":" + id;
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent, BarcodeFormat.QR_CODE,350,350);
        BufferedImage qrImage = new BufferedImage(350,350, BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < 350; x++) {
            for (int y = 0; y < 350; y++) {
                int pixel = bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF;
                qrImage.setRGB(x, y, pixel);
            }
        }
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        ImageIO.write(qrImage, "png", byteArrayOutputStream);
        String base64Image = Base64.getEncoder().encodeToString(byteArrayOutputStream.toByteArray());
        return ResponseEntity.ok().body(base64Image);
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
    @GetMapping("/getBooking/{id}")
    public ResponseEntity<?> getBooking(@PathVariable long id){
        return ResponseEntity.ok().body(bookingsRepository.getReceipts(id));
    }
    @GetMapping("/EntranceScanner/{id}")
    public ResponseEntity<?> getEntranceScanner(@PathVariable long id){
        Optional<Bookings> booking = bookingsRepository.findById(id);
        Bookings booked = booking.get();
        if(booked.getStatus().equals(BookingStatus.Cancelled)){
            return ResponseEntity.ok().body("Entrance have been used or cancelled");
        }else if(booked.getStatus().equals(BookingStatus.Used)){
            return ResponseEntity.ok().body("Entrance has been used");
        }
        booked.setStatus(BookingStatus.Used);
        bookingsRepository.save(booked);
        return ResponseEntity.ok().body("Booking Confirmed");
    }
    @GetMapping("/getPendingBookings")
    public ResponseEntity<?> getPendingBooking(){
        return ResponseEntity.ok().body(bookingService.getBooked());
    }
    @GetMapping("/getCancelledBookings")
    public ResponseEntity<?> getCancelledBooking(){
        return ResponseEntity.ok().body(bookingService.getCancelled());
    }
    @GetMapping("/getHistory/{id}")
    public UserBookingHistoryDTO getUserBookingHistory(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return null;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)) {
            return bookingService.getBookingHistory(id);
        }
        return null;
    }
    @GetMapping("/getUsed/{id}")
    public UserBookingHistoryDTO getUsedBookingHistory(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return null;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)) {
            return bookingService.getUsedBooking(id);
        }
        return null;
    }
    @GetMapping("/getCancelled/{id}")
    public UserBookingHistoryDTO getCancelledBookingHistory(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return null;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return bookingService.getCancelledBooking(id);

        }
        return null;
    }
    @GetMapping("/getAllUserBookings/{id}")
    public List<UserBookingsDTO> getAllUserBookings(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
            return userBookingsDTO;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return bookingService.getAllBookings(id);
        }
        ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
        return userBookingsDTO;
    }
    @GetMapping("/getAllUsedBookings/{id}")
    public List<UserBookingsDTO> getAllUsedBookings(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
            return userBookingsDTO;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return bookingService.getAllUsedBookings(id);
        }
        ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
        return userBookingsDTO;
    }
    @GetMapping("/getAllCancelledBookings/{id}")
    public List<UserBookingsDTO> getAllCancelledBookings(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
            return userBookingsDTO;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return bookingService.getAllCancelledBookings(id);
        }
        ArrayList<UserBookingsDTO> userBookingsDTO = new ArrayList<>();
        return userBookingsDTO;
    }
    @GetMapping("/getAreaBooking/{id}")
    public List<ChartDTO> getAreaBooking(@PathVariable long id){
        return bookingsRepository.getAreaBooking(id,BookingStatus.Open);
    }
    @GetMapping("/getAreaCancelledBooking/{id}")
    public List<ChartDTO> getAreaCancelledBooking(@PathVariable long id){
        return bookingsRepository.getAreaBooking(id,BookingStatus.Cancelled);
    }
    @GetMapping("/getAllAreaBooking/{id}")
    public List<AreaBookingDTO> getAllAreaBokking(@PathVariable long id){
        return bookingsRepository.getAreaAllBooking(id);
    }
    @GetMapping("/searchAreaBooking/{id}/{email}")
    public List<AreaBookingDTO> searchAreaBooking(@PathVariable long id, @PathVariable String email){
        return bookingsRepository.getAreaBookingByEmail(email,id);
    }
    @GetMapping("/getActiveBookingUsers")
    public ActiveBookingUsersDTO getActiveBookingUsers(){
        return bookingService.getActiveBookingUsers();
    }
    @GetMapping("/getAllAreaCount")
    public List<CountInfoDTO> getAllAreaCount(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return bookingsRepository.getAllTimeCountInfo();
        }
        return new ArrayList<>();

    }

}
