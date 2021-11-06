package com.example.finalproj.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String username;
    private String firstName;
    private String lastName;
    private String address;
    private int accountCharge;
}
