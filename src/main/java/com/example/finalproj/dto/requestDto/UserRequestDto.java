package com.example.finalproj.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestDto {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String address;
    private int amount;
}