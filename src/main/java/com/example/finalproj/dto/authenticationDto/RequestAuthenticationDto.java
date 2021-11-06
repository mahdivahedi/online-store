package com.example.finalproj.dto.authenticationDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RequestAuthenticationDto {
    private String username;
    private String password;
}
