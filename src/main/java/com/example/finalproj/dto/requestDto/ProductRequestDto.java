package com.example.finalproj.dto.requestDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequestDto {
    private Long id;
    private String name;
    private Long categoryId;
    private int price;
    private int inventory;
    private String productImage;
}
