package com.parkify.back.controller;

import com.parkify.back.dto.BookDTO;
import com.parkify.back.repository.SpotsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/spots")
public class SpotController {
    @Autowired
    private SpotsRepository spotsRepository;

    @GetMapping("/book/{id}")
    public List<BookDTO> bookSpot(@PathVariable long id){
        return spotsRepository.getBooks(id);
    }
}
