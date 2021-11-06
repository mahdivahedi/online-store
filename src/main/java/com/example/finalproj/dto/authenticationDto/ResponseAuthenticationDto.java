package com.example.finalproj.dto.authenticationDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseAuthenticationDto {
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private int accountCharge;
    private String jwt;
}
