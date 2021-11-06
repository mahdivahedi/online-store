package com.example.finalproj.controller;

import com.example.finalproj.dto.requestDto.ReceiptRequestDto;
import com.example.finalproj.dto.response.BaseResponse;
import com.example.finalproj.dto.response.SuccessResponse;
import com.example.finalproj.dto.responseDto.ReceiptResponseDto;
import com.example.finalproj.service.ReceiptService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("receipt")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping("/getById/{id}")
    public BaseResponse getReceiptById(@PathVariable Long id) {
        List<Object> receipt = new ArrayList<>();
        receipt.add(receiptService.findById(id));
        return new SuccessResponse(0, receipt);
    }

    @GetMapping("/getAll")
    public BaseResponse getAllReceipt() {
        List<Object> receipts = new ArrayList<>(receiptService.findAllReceipts());
        return new SuccessResponse(0, receipts);
    }

    @GetMapping("/getByTrackingCode/{trackingCode}")
    public BaseResponse getByTrackingCode(@PathVariable Long trackingCode) {
        List<Object> receipts = new ArrayList<>();
        receipts.add(receiptService.findById(trackingCode));
        return new SuccessResponse(0, receipts);
    }

    @PutMapping("/update")
    public BaseResponse updateReceipt(@RequestBody ReceiptRequestDto rrd) {
        receiptService.updateReceipt(rrd);
        return new SuccessResponse(2);
    }
}
