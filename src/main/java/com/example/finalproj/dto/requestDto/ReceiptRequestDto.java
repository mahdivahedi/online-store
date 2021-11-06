package com.example.finalproj.dto.requestDto;

import com.example.finalproj.entity.ReceiptStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReceiptRequestDto {
    private Long trackingId;
    private ReceiptStatus status;
}
