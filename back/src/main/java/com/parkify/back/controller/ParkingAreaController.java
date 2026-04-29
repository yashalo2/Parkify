package com.parkify.back.controller;

import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.EntranceScannerRepository;
import com.parkify.back.repository.ExitScannerRepository;
import com.parkify.back.repository.ParkingAreaRepository;
import com.parkify.back.repository.UserRepository;
import com.parkify.back.service.ParkingAreaService;
import jakarta.servlet.http.HttpSession;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/parkingArea")
public class ParkingAreaController {
    @Autowired
    private ParkingAreaRepository parkingAreaRepository;
    @Autowired
    private ParkingAreaService parkingAreaService;
    @Autowired
    private ExitScannerRepository exitScannerRepository;
    @Autowired
    private EntranceScannerRepository entranceScannerRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/getLocations")
    public List<LocationDTO> getLocations() {
         return parkingAreaRepository.getLocations();
     }
     @GetMapping("/getParkingArea")
    public List<ParkingArea> getSpots() {
        return parkingAreaRepository.findAll();
     }
     @GetMapping("/getArea/{id}")
    public List<AreaDTO> getArea(@PathVariable long id) {
        return parkingAreaRepository.getArea(id);
    }
    @GetMapping("/getAreaInfo/{id}")
    public List<UserAreaInfoDTO> getAreaInfo(@PathVariable long id) {
        return parkingAreaRepository.getUserAreaInfo(SpotStatus.Available,SpotStatus.Occupied,SpotStatus.Reserved,id);
    }
    @GetMapping("/getAvailableSpots")
    public ResponseEntity<?> getAvailableSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getAvailableSpots());
    }
    @GetMapping("/getReservedSpots")
    public ResponseEntity<?> getReservedSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getReservedSpots());
    }
    @GetMapping("/getOccupiedSpots")
    public ResponseEntity<?> getOccupiedSpots() {
        return ResponseEntity.ok().body(parkingAreaService.getOccupiedSpots());
    }
    @GetMapping("/getActiveParkingArea")
    public List<ActiveAreaDTO> getActiveParkingArea() {
        return parkingAreaRepository.getActiveArea();
    }
    @PostMapping("/addArea")
    public long createLot(@RequestBody ParkingArea lot) {
        ParkingArea area = parkingAreaRepository.save(lot);

        return area.getId();

    }
    @GetMapping("/getManageArea")
    public List<ManageAreaDTO> getManageArea() {
        return parkingAreaRepository.getManageArea();
    }
    @GetMapping("/search/{search}")
    public List<ManageAreaDTO> search(@PathVariable String search) {
        return parkingAreaRepository.search(search);
    }
    @GetMapping("/searchArea/{search}")
    public List<LocationDTO> searchLocation(@PathVariable String search) {
        return parkingAreaRepository.searchLocation(search);
    }
    @GetMapping("/getAreaCoords/{id}")
    public List<CoordsDTO> getCoords(@PathVariable long id) {
        return parkingAreaRepository.getCoords(id);
    }
    @GetMapping("/getAddGateInfo/{id}")
    public List<AddGateDTO> getAddGateInfo(@PathVariable long id, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return parkingAreaRepository.getAddGateInfo(id);
        }
        return new ArrayList<>();

    }
    @PostMapping("/entrance/{id}")
    public String entrance(String password, @PathVariable long id, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){

        }
        return "UnAuthorized User";
    }
    @PostMapping("/close/{id}")
    public String close(@PathVariable long id, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            ParkingArea area = parkingAreaRepository.findById(id).get();
            area.setAreaStatus(AreaStatus.Closed);
            parkingAreaRepository.save(area);
            return "Area Closed";
        }
        return "UnAuthorized User";

    }
    @PostMapping("/Open/{id}")
    public String open(@PathVariable long id, HttpSession session) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            ParkingArea area = parkingAreaRepository.findById(id).get();
            area.setAreaStatus(AreaStatus.Open);
            parkingAreaRepository.save(area);
            return "Area Opened";
        }
        return "UnAuthorized User";
    }
    @PostMapping("/addEntrance/{id}")
    public String addEntrance(@PathVariable long id, HttpSession session,@ModelAttribute EntranceScanner entranceScanner) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(!user.getRole().equals(Role.Admin)){
            return "UnAuthorized User";
        }
        ParkingArea area = parkingAreaRepository.findById(id).get();
        if(entranceScannerRepository.findByParkingAreaId(area.getId()) != null){
            return "Parking has Gate";
        }
        if(entranceScannerRepository.codeExists(entranceScanner.getCode()) != null){
            return "Gate With This Code Exists";
        }
        entranceScanner.setParkingArea(area);
        EntranceScanner newScanner = new EntranceScanner();
        newScanner.setCode(entranceScanner.getCode());
        newScanner.setParkingArea(area);
        newScanner.setPassword(entranceScanner.getPassword());
        entranceScannerRepository.save(newScanner);
        return "Gate Added Successfully";

    }
    @PostMapping("/addExit/{id}")
    public String addExit(@PathVariable long id, HttpSession session,@ModelAttribute ExitScanner exitScanner) {
        String email = (String) session.getAttribute("email");
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(!user.getRole().equals(Role.Admin)){
            return "UnAuthorized User";
        }
        ParkingArea area = parkingAreaRepository.findById(id).get();
        if(exitScannerRepository.findByParkingAreaId(area.getId()) != null){
            return "Parking has Gate";
        }
        if(exitScannerRepository.codeExists(exitScanner.getCode()) != null){
            return "Gate With This Code Exists";
        }
        ExitScanner newScanner = new ExitScanner();
        newScanner.setParkingArea(area);
        newScanner.setCode(exitScanner.getCode());
        newScanner.setPassword(exitScanner.getPassword());
        exitScanner.setParkingArea(area);
        ExitScanner exit = exitScannerRepository.save(newScanner);
        System.out.println(exit.getId());
        return "Gate Added Successfully";
    }


}
