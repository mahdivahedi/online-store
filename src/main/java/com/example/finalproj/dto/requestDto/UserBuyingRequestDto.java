package com.example.finalproj.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBuyingRequestDto {
    private String username;
    private long productId;
    private int quantity;
}
