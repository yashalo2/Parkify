package com.parkify.back.controller;

import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.PendingUser;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.repository.PendingUserRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.EmailService;
import com.parkify.back.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    @Autowired
    private PendingUserRepository pendingUserRepository;
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@ModelAttribute PendingUser user, HttpSession session) throws MessagingException {
        session.setAttribute("email", user.getEmail());
        System.out.println(user.getEmail());
        if(userRepository.existsByEmail(user.getEmail())) {
            return "User with the email already exists";
        }
        if(pendingUserRepository.existsByEmail(user.getEmail())) {
            int code = 100000 + random.nextInt(900000);
            emailService.sendEmail(user.getEmail(),"Registration",code);

            return "send email";
        }
        PendingUser register = new PendingUser();
        register.setEmail(user.getEmail());
        register.setPassword(user.getPassword());
        register.setFirstName(user.getFirstName());
        register.setLastName(user.getLastName());
        int code = 100000 + random.nextInt(900000);
        register.setCode(code);
        pendingUserRepository.save(register);
        emailService.sendEmail(register.getEmail(), "Registration", code);

        return "Verification Code Sent";
    }
    @PostMapping("/verify/{code}")
    public String verify(@PathVariable int code,HttpSession session) {
        String email =  (String) session.getAttribute("email");
        System.out.println(email);
        if(email == null) {
            return "Time Out";
        }
        PendingUser pendingUser = pendingUserRepository.findByEmail(email);
        if(pendingUser.getCode() == code) {
            User user = new User();
            user.setEmail(email);
            user.setPassword(pendingUser.getPassword());
            user.setFirstName(pendingUser.getFirstName());
            user.setLastName(pendingUser.getLastName());
            userRepository.save(user);
            return "User Successfully Verified";
        }
        return "Invalid Code";

    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@ModelAttribute User user, HttpSession session) {
        if(userRepository.existsByEmail(user.getEmail())) {
            User customer = userRepository.findByEmail(user.getEmail());
            if(customer.getPassword().equals(user.getPassword())) {
                session.setAttribute("id", customer.getId());
                session.setAttribute("email", customer.getEmail());
                session.setAttribute("firstName", customer.getFirstName());
                session.setAttribute("lastName", customer.getLastName());
                session.setAttribute("role", customer.getRole());
                String email = (String) session.getAttribute("email");
                return ResponseEntity.ok().body(Map.of(
                        "id",customer.getId(),
                        "email",customer.getEmail(),
                        "role",customer.getRole(),
                        "firstName",customer.getFirstName(),
                        "lastName",customer.getLastName()

                ));
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                    "Wrong Credentia"
            );
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                "user not registered"
        );
    }

    @GetMapping("/getSupport")
    public Long getAdmin(){
        User supporter=userRepository.findByRole(Role.Admin);
        return supporter.getId();
    }
    @GetMapping("/getUsers")
    public List<UserDTO> getUsers(){
        return userRepository.findAllUserDTO();
    }
    @GetMapping("/search/{search}")
    public List<UserDTO> getUsers(@PathVariable String search){
        return userRepository.search(search);
    }
    @GetMapping("/getUser/{id}")
    public UserDTO getUser(@PathVariable long id,HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null) {
            return null;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)) {
            return userRepository.getUserDTO(id);
        }
        return null;


    }
    @GetMapping("/getGoldenUser")
    public List<UserDTO> getGoldenUser(HttpSession session){
        String email=(String) session.getAttribute("email");
        if(email == null) {
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)) {
            return userService.getGoldenUser();
        }
        return new ArrayList<>();

    }

}
