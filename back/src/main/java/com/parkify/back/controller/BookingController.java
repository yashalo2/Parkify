package com.parkify.back.controller;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.qrcode.encoder.QRCode;
import com.parkify.back.model.Bookings;
import com.parkify.back.model.SpotStatus;
import com.parkify.back.model.Spots;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.SpotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
@RestController
@RequestMapping("api/booking")
public class BookingController {
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private SpotsRepository spotsRepository;

    @PostMapping("/book")
    public ResponseEntity<?> book(@ModelAttribute Bookings bookings) throws WriterException, IOException {
        Spots spots = bookings.getSpot();
        spots.setSpotStatus(SpotStatus.Reserved);
        spotsRepository.save(spots);
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
    @GetMapping("/getMyBooking")
    public ResponseEntity<?> getMyBooking(){
        return ResponseEntity.ok().body(bookingsRepository.getBookings());


    }
    @GetMapping("/getBooking/{id}")
    public ResponseEntity<?> getBooking(@PathVariable long id){
        return ResponseEntity.ok().body(bookingsRepository.getReceipts(id));
    }
}
