package com.parkify.back.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.PaymentRepository;
import com.parkify.back.repository.RePayRepository;
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
import java.io.IOException;
import java.util.ArrayList;
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
    @Autowired
    private RePayRepository rePayRepository;

    @GetMapping("/pay/{booking}/{amount}")
    public ResponseEntity<String> pay(@PathVariable double amount, @PathVariable long booking) throws WriterException, IOException {
        return ResponseEntity.ok().body(paymentService.Pay(amount, booking));
    }
    @GetMapping("/rePay/{payment}/{amount}")
    public ResponseEntity<String> rePay(@PathVariable double amount, @PathVariable long payment) throws WriterException, IOException {
        return ResponseEntity.ok().body(paymentService.rePay(amount, payment));
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
        if(status.equals(PaymentStatus.Open.toString())){
            return ResponseEntity.ok().body(paymentRepository.getBookingInfo(user.getId(),PaymentStatus.Open));

        }
        if(status.equals(PaymentStatus.Used.toString())){
            return ResponseEntity.ok().body(paymentRepository.getBookingInfo(user.getId(),PaymentStatus.Used));

        }
        return ResponseEntity.ok().body(paymentRepository.getBookingInfo(user.getId(),PaymentStatus.TimeOut));


    }
    @GetMapping("/getAreaGross/{id}")
    public List<ChartDTO> getAreaGross(@PathVariable long id) {
        return paymentRepository.getChart(id);
    }
    @GetMapping("/getTopGrossingAllTime")
    public List<CompareGrossDTO> getTopGrossingAllTime() {
        return paymentService.getTopGrossingAllTime();
    }

    @GetMapping("/getLessGrossingAllTime")
    public List<CompareGrossDTO> getLessGrossingAllTime() {
        return paymentService.getLessGrossingAllTime();
    }
    @GetMapping("/getLessGrossingCount")
    public List<CountInfoDTO> getLessGrossingCount() {
        return paymentService.getLessCount();
    }
    @GetMapping("/getTopGrossingCount")
    public List<CountInfoDTO> getTopGrossingCount() {
        return paymentService.getTopCount();
    }
    @GetMapping("/getTopArea")
    public AreaDTO getTopArea() {
        return paymentService.getTopArea();
    }
    @GetMapping("/getLessArea")
    public AreaDTO getLessArea() {
        return paymentService.getLessArea();
    }
    @GetMapping("/getGoldenUser")
    public List<HeatMapDTO> getGoldenUser(HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return paymentService.getTopHeatMap();

        }
        return new ArrayList<>();
    }
    @PostMapping("/updatePaymentTimeOut")
    public String updateTimeOUt(@ModelAttribute RePay pay,HttpSession session ){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User not logged in";
        }
        User user = userRepository.findByEmail(email);
        RePay old = rePayRepository.getAll();
        old.setTimeOut(pay.getTimeOut());
        if(user.getRole().equals(Role.Admin)){
            if(pay.getType().equals(TimeOut.Day)){
                old.setType(TimeOut.Day);
                rePayRepository.save(old);
                return "Update Success";

            }else if(pay.getType().equals(TimeOut.Week)){
                old.setType(TimeOut.Week);
                rePayRepository.save(old);
                return "Update Success";
            }
            old.setType(TimeOut.Minute);
            rePayRepository.save(old);
            return "Update Success";

        }
        return "UnAuthorized User";

    }
    @GetMapping("/getRePayData")
    public RePay getRePayData(HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new RePay();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return rePayRepository.getAll();
        }
        return new RePay();
    }
    @GetMapping("/getBooking/{id}")
        public ResponseEntity<?> getBooking(@PathVariable long id){
            return ResponseEntity.ok().body(paymentRepository.getReceipts(id));
        }
 }
