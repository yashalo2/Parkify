package com.parkify.back.controller;

import com.parkify.back.dto.*;
import com.parkify.back.model.*;
import com.parkify.back.repository.*;
import com.parkify.back.service.ParkingAreaService;
import jakarta.servlet.http.HttpSession;
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
    private GateRepository gateRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private SpotsRepository spotsRepository;
    @Autowired
    private AlertRepository alertRepository;

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
    @PostMapping("/addGate/{id}/{type}")
    public String addEntrance(@PathVariable long id,@PathVariable String type, HttpSession session,@ModelAttribute Gate entranceScanner) {
        String email = (String) session.getAttribute("email");
        System.out.println(type);
        if(email == null){
            return "User Not Logged In";
        }
        User user = userRepository.findByEmail(email);
        if(!user.getRole().equals(Role.Admin)){
            return "UnAuthorized User";
        }
        ParkingArea area = parkingAreaRepository.findById(id).get();
        if(gateRepository.codeExists(entranceScanner.getCode()) != null){
            return "Gate With This Code Exists";
        }
        if(gateRepository.findByParkingAreaId(area.getId()) != null){
            Gate gate = gateRepository.findByParkingAreaId(area.getId());
            if(type.equals("Entrance")){
                gate.setGateType(GateType.Entrance);
                gate.setCode(entranceScanner.getCode());
                entranceScanner.setParkingArea(area);
                gateRepository.save(gate);
                return "Gate Modified";
            }
            gate.setGateType(GateType.Exit);
            gate.setCode(entranceScanner.getCode());
            entranceScanner.setParkingArea(area);
            gateRepository.save(gate);
            return "Gate Modified";
        }
        if(type.equals("Entrance")) {
            entranceScanner.setParkingArea(area);
            Gate newScanner = new Gate();
            newScanner.setCode(entranceScanner.getCode());
            newScanner.setParkingArea(area);
            newScanner.setPassword(entranceScanner.getPassword());
            newScanner.setGateType(GateType.Entrance);
            gateRepository.save(newScanner);
            return "Gate Added Successfully";
        }
            entranceScanner.setParkingArea(area);
            Gate newScanner = new Gate();
            newScanner.setCode(entranceScanner.getCode());
            newScanner.setParkingArea(area);
            newScanner.setPassword(entranceScanner.getPassword());
            newScanner.setGateType(GateType.Exit);
            gateRepository.save(newScanner);
            return "Gate Added Successfully";

    }
    @GetMapping("/getAreaQuantity")
    public long getQuantity(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return 0;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return parkingAreaRepository.areaQQuantity();
        }
        return 0;

    }
    @GetMapping("/getSpotQuantity")
    public long getSpotQuantity(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return 0;
        }
        User user = userRepository.findByEmail(email);
        if(user.getRole().equals(Role.Admin)){
            return spotsRepository.spotsQuantity();
        }
        return 0;
    }
    @PostMapping("/entranceScanner")
    public String login(@RequestBody GateDTO gate,HttpSession session){
       Gate scanner= gateRepository.codeExists(gate.getCode());
       if(scanner == null){
           return "Wrong Credential";
       }
       if(scanner.getPassword().equals(gate.getPassword())){
           session.setAttribute("code",scanner.getCode());
           return "Login Success";
       }
       return "Wrong Credential";

    }
@GetMapping("/getAlerts")
    public List<AlertDTO> getAlerts(HttpSession session){
        String email = (String) session.getAttribute("email");
        if(email == null){
            return new ArrayList<>();
        }
        User user = userRepository.findByEmail(email);
        return alertRepository.getAllAlerts(user.getId());
}
@GetMapping("/getScannerInfo")
    public String getScannerInfo(HttpSession session){
        String code = (String) session.getAttribute("code");
        if(code == null){
            return "Gate Not Logged In";
        }
        String name = gateRepository.getName(code);
        return name;

}

}
