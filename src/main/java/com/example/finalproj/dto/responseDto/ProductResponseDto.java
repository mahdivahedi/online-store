package com.example.finalproj.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDto {
    private Long id;
    private String name;
    private Long categoryId;
    private String categoryName;
    private int inventory;
    private int sold;
    private int price;
    private String image;
}
