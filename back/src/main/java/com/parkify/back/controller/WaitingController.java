package com.parkify.back.controller;

import com.parkify.back.model.BookingStatus;
import com.parkify.back.model.Contact;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.BookingsRepository;
import com.parkify.back.repository.ContactRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/waiting")
public class WaitingController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingsRepository bookingsRepository;
    @Autowired
    private ContactRepository contactRepository;
    @Autowired
    private EmailService emailService;

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
    @PostMapping("/sendMessage")
    public String sendMessage(@ModelAttribute Contact contact){
        contactRepository.save(contact);
        return "Message Sent";
    }
    @GetMapping("/getMessage")
    public List<Contact> getMessage(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new ArrayList<Contact>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return contactRepository.findAll();
        }
        return new ArrayList<Contact>();

    }
    @PostMapping("/sendMail/{email}/{subject}/{content}/{id}")
    public String sendMail(@PathVariable String email,@PathVariable String subject,@PathVariable String content,@PathVariable long id,HttpSession session) throws MessagingException {
        String emaill = (String) session.getAttribute("email");
        if(emaill == null){
            return "User not logged in";
        }
        User user=userRepository.findByEmail(emaill);
        if(user.getRole().equals(Role.Admin)){
            emailService.sendEmailToGoldenUser(email,subject,content,user.getFirstName());
            Optional<Contact> contact=contactRepository.findById(id);
            contact.get().setReplied(true);
            contactRepository.save(contact.get());
            return "Mail sent";
        }
        return "UnAuthorized User";
    }
}
