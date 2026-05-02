package com.parkify.back.dto;

public class GateDTO {
    private String code;
    private String password;

    public GateDTO(String code, String password) {
        this.code = code;
        this.password = password;
    }

    public String getCode() {
        return code;
    }

    public String getPassword() {
        return password;
    }
}
