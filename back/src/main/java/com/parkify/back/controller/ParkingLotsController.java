package com.parkify.back.controller;

import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.ParkingLotsRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.ParkingLotsService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/parkingLots")
public class ParkingLotsController {
    @Autowired
    private ParkingLotsRepository parkingLotsRepository;

    @Autowired
    private ParkingLotsService parkingLotsService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/addSpots")
    public String add(@ModelAttribute SpotDTO spotDTO) {
        String message = parkingLotsService.addLot(spotDTO);
        if(message == "SUCCESS") {
            return message;
        }
        return "Error Occurred";
    }
    @GetMapping("/getLots/{id}")
    public List<LotInfoDTO> getLots(@PathVariable int id) {
        return parkingLotsRepository.getLotInfo(id);
    }
    @GetMapping("/getInfo/{id}")
    public List<SpaceDTO> getSpots(@PathVariable int id) {
        return parkingLotsRepository.getSpaceInfo(id);
    }
    @GetMapping("/getActiveParkingLot")
    public List<ActiveLevelDTO> getActiveParkingLot() {
        return parkingLotsRepository.getActiveLevel();
    }
    @GetMapping("/getLevels/{id}")
    public List<LevelDTO> getLevels(@PathVariable long id, HttpSession session) {
        String email= (String) session.getAttribute("email");
        if(email==null) {
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return parkingLotsRepository.getLevels(id);
        }
        return new ArrayList<>();
    }
    @PostMapping("/status/{id}")
    public String toggleStatus(@PathVariable long id, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if (email == null) {
            return "user not logged in";
        }
        User user = userRepository.findByEmail(email);
        if (user.getRole().equals(Role.Admin)) {
            Optional<ParkingLots> level =  parkingLotsRepository.findById(id);
            if (level.isPresent()) {
                if(level.get().getStatus().equals(LotStatus.Open)){
                    level.get().setStatus(LotStatus.Closed);
                    parkingLotsRepository.save(level.get());
                    return "Status Updated" ;
                }else{
                    level.get().setStatus(LotStatus.Closed);
                    parkingLotsRepository.save(level.get());
                    return "Status Updated" ;

                }
            }
            return "Level Not Found";
        }
        return "UnAuthorized User";
    }
    @PostMapping("/price/{id}/{price}")
    public String updatePrice(@PathVariable long id,@PathVariable double price,HttpSession session){
        String email= (String) session.getAttribute("email");
        if(email==null) {
            return "user not logged in";
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            Optional<ParkingLots> parkingLots = parkingLotsRepository.findById(id);
            if(parkingLots.isPresent()){
                parkingLots.get().setPrice(price);
                parkingLotsRepository.save(parkingLots.get());
                return "Price Updated";
            }
            return "Level Not Found";
        }
        return "UnAuthorized User";
    }

}
