package com.parkify.back.controller;

import com.parkify.back.dto.UserDTO;
import com.parkify.back.model.ParkingArea;
import com.parkify.back.model.Role;
import com.parkify.back.model.User;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
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

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user) throws MessagingException {

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
        emailService.sendEmail("yasin2ashalo@gmail.com","Registration",code);

        return "User Registered Successfully";
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

}
