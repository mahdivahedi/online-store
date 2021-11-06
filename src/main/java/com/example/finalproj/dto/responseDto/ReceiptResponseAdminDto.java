package com.example.finalproj.dto.responseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptResponseAdminDto {

    private Long trackingCode;
    private String product;
    private int price;
    private String username;
//    private int quantity;
    private String address;
//    private String status;
//    private Date date;

}
