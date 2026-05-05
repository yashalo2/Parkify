package com.parkify.back.service;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.*;

@Service
public class PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpotsRepository  spotsRepository;
    @Autowired
    private RePayRepository rePayRepository;
    public String Pay(double pricePerHour, long bookingId) throws WriterException, IOException {
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
        RePay rePay = rePayRepository.getAll();
        if(rePay == null) {
            Instant now = Instant.now();
            Instant addMinutes = now.minus(Duration.ofMinutes(20));
            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setAmount(amount);
            payment.setExpireDate(addMinutes);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        if(rePay.getType().equals(TimeOut.Day)) {
            Instant now = Instant.now();
            Instant addDay = now.minus(Duration.ofDays(rePay.getTimeOut()));
            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setAmount(amount);
            payment.setExpireDate(addDay);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        if(rePay.getType().equals(TimeOut.Week)) {
            Instant now = Instant.now();
            Instant addDay = now.minus(Duration.ofDays(rePay.getTimeOut() * 7));
            Payment payment = new Payment();
            payment.setBooking(booking);
            payment.setAmount(amount);
            payment.setExpireDate(addDay);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        Instant now = Instant.now();
        Instant addDay = now.minus(Duration.ofMinutes(rePay.getTimeOut()));
        Payment payment = new Payment();
        payment.setBooking(booking);
        payment.setAmount(amount);
        payment.setExpireDate(addDay);
        Payment paid = paymentRepository.save(payment);
        booking.setPaid(true);
        Spots spots = booking.getSpot();
        spots.setSpotStatus(SpotStatus.Available);
        spotsRepository.save(spots);
        bookingsRepository.save(booking);
        String qrContent = "{\"paymentId\":" + paid.getId();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
        BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < 250; x++) {
            for (int y = 0; y < 250; y++) {
                int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                qrImage.setRGB(x, y, pixel);
            }
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(qrImage,"png",outputStream);
        String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
        return base64Image;
    }
    public String rePay(double price,long paymentId) throws WriterException, IOException {
        Payment payment = paymentRepository.findById(paymentId).get();
        Instant end = Instant.now();
        Instant start = payment.getExpireDate();
        Duration duration = Duration.between(start, end);
        Bookings booking=paymentRepository.getPrice(paymentId);
        double hours = duration.toMinutes() / 60.0;
        double amount = booking.getPrice() * hours;
        if(amount > price) {
            return "Amount not enough";
        }
        RePay rePay = rePayRepository.getAll();
        if(rePay == null) {
            Instant now = Instant.now();
            Instant addMinutes = now.minus(Duration.ofMinutes(20));
            payment.setStatus(PaymentStatus.Open);
            payment.setAmount(amount);
            payment.setExpireDate(addMinutes);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        if(rePay.getType().equals(TimeOut.Day)) {
            Instant now = Instant.now();
            Instant addDay = now.minus(Duration.ofDays(rePay.getTimeOut()));
            payment.setStatus(PaymentStatus.Open);
            payment.setAmount(amount);
            payment.setExpireDate(addDay);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        if(rePay.getType().equals(TimeOut.Week)) {
            Instant now = Instant.now();
            Instant addDay = now.minus(Duration.ofDays(rePay.getTimeOut() * 7));
            payment.setStatus(PaymentStatus.Open);
            payment.setAmount(amount);
            payment.setExpireDate(addDay);
            Payment paid = paymentRepository.save(payment);
            booking.setPaid(true);
            Spots spots = booking.getSpot();
            spots.setSpotStatus(SpotStatus.Available);
            spotsRepository.save(spots);
            bookingsRepository.save(booking);
            String qrContent = "{\"paymentId\":" + paid.getId();
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
            BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < 250; x++) {
                for (int y = 0; y < 250; y++) {
                    int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                    qrImage.setRGB(x, y, pixel);
                }
            }
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(qrImage,"png",outputStream);
            String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
            return base64Image;
        }
        Instant now = Instant.now();
        Instant addDay = now.minus(Duration.ofMinutes(rePay.getTimeOut()));
        payment.setStatus(PaymentStatus.Open);
        payment.setAmount(amount);
        payment.setExpireDate(addDay);
        Payment paid = paymentRepository.save(payment);
        booking.setPaid(true);
        Spots spots = booking.getSpot();
        spots.setSpotStatus(SpotStatus.Available);
        spotsRepository.save(spots);
        bookingsRepository.save(booking);
        String qrContent = "{\"paymentId\":" + paid.getId();
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(qrContent,BarcodeFormat.QR_CODE,250,250);
        BufferedImage qrImage=new BufferedImage(250,250,BufferedImage.TYPE_INT_RGB);
        for (int x = 0; x < 250; x++) {
            for (int y = 0; y < 250; y++) {
                int pixel = bitMatrix.get(x,y) ? 0xFF000000 : 0xFFFFFF;
                qrImage.setRGB(x, y, pixel);
            }
        }
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ImageIO.write(qrImage,"png",outputStream);
        String base64Image = Base64.getEncoder().encodeToString(outputStream.toByteArray());
        return base64Image;

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
    @Scheduled(fixedDelay = 100000)
    public void canceledBooking(){
        Instant now = Instant.now();
        List<Payment> payments = paymentRepository.getAllByStatus(PaymentStatus.Open);
        payments.forEach(payment -> {
            if(payment.getExpireDate().isBefore(now)) {
               payment.setStatus(PaymentStatus.TimeOut);
               paymentRepository.save(payment);
            }
        });
    }


}
