package com.parkify.back.controller;

import com.parkify.back.dto.BookDTO;
import com.parkify.back.model.Role;
import com.parkify.back.model.Spots;
import com.parkify.back.model.User;
import com.parkify.back.repository.SpotsRepository;
import com.parkify.back.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/spots")
public class SpotController {
    @Autowired
    private SpotsRepository spotsRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/book/{id}")
    public List<BookDTO> bookSpot(@PathVariable long id){
        return spotsRepository.getBooks(id);
    }
    @GetMapping("/get")
    public List<Spots> getSpots(@RequestParam long id){
        return spotsRepository.findAll();

    }

}
