package com.parkify.back.controller;

import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.User;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;

@RestController
@RequestMapping("api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    @Autowired
    private EmailService emailService;
    private static final SecureRandom random = new SecureRandom();

    @PostMapping("/register")
    public String registerUser(@RequestBody User user) throws MessagingException {
        emailService.sendEmail("yasin2ashalo@gmail.com","Registration","You did it",2435);

        if(userRepository.existsByEmail(user.getEmail())) {
            return "User with the email already exists";
        }

        User register = new User();
        register.setEmail(user.getEmail());
        register.setPassword(user.getPassword());
        register.setFirstName(user.getFirstName());
        register.setLastName(user.getLastName());
        userRepository.save(register);
        int code = 100000 + random.nextInt(900000);
        return "User Registered Successfully";
    }
    @PostMapping("/login")
    public String login(@ModelAttribute User user, HttpSession session) {
        if(userRepository.existsByEmail(user.getEmail())) {
            User customer = userRepository.findByEmail(user.getEmail());
            if(customer.getPassword().equals(user.getPassword())) {
                session.setAttribute("id", customer.getId());
                session.setAttribute("email", customer.getEmail());
                String email = (String) session.getAttribute("email");
                return email;
            }
            return "Wrong Credentials";
        }
        return "Wrong Credentials";
    }
    @PostMapping("/addArea")
        public long createLot(@RequestBody ParkingArea lot) {

        ParkingArea area = parkingAreaRepository.save(lot);
    return area.getId(); 

    }
}
