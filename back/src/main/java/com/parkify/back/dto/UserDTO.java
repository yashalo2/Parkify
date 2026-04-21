package com.parkify.back.dto;

import com.parkify.back.model.CustomerLevel;
import com.parkify.back.model.UserStatus;

public class UserDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String status;
    private String userLevel;

    public UserDTO(long id, String firstName, String lastName, String email, UserStatus status, CustomerLevel userLevel) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.status = status.toString();
        this.userLevel = userLevel.toString();
    }

    public String getUserLevel() {
        return userLevel;
    }

    public long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getStatus() {
        return status;
    }
}
