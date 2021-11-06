package com.example.finalproj.dto.responseDto;

import com.example.finalproj.entity.Product;
import com.example.finalproj.entity.ReceiptStatus;
import com.example.finalproj.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBuyingResponseDto {
    private Long trackingCode;
    private String productName;
    private Long productId;
    private String username;
    private int quantity;
    private String address;
    private int price;
    private Date date;
    private String status;
}
