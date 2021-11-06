package com.example.finalproj.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptResponseDto {
    private Long trackingCode;
    private String product;
//    private String username;
//    private int quantity;
    private int price;
    private String address;
//    private String status;
//    private Date date;
}
