package com.parkify.back.service;

import com.parkify.back.dto.GoldenUserDTO;
import com.parkify.back.dto.HeatMapDTO;
import com.parkify.back.dto.UserDTO;
import com.parkify.back.repository.PaymentRepository;
import com.parkify.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PaymentRepository paymentRepository;
    public List<UserDTO> getGoldenUser() {
        List<GoldenUserDTO> results = paymentRepository.getGoldenUser();
        GoldenUserDTO top = results.isEmpty() ? null : results.get(0);
        if(top == null){
            return new ArrayList<>();
        }
        return userRepository.getGoldenUser(top.getId());
    }
}
