package com.example.finalproj.service;

import com.example.finalproj.dto.requestDto.ReceiptRequestDto;
import com.example.finalproj.dto.responseDto.ReceiptResponseAdminDto;
import com.example.finalproj.dto.responseDto.ReceiptResponseDto;
import com.example.finalproj.entity.Receipt;
import com.example.finalproj.exception.DatabaseException;
import com.example.finalproj.exception.NotFoundObjectException;
import com.example.finalproj.exception.NullValueException;
import com.example.finalproj.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReceiptService {

    private final ReceiptRepository receiptRepository;

    public ReceiptService(ReceiptRepository receiptRepository) {
        this.receiptRepository = receiptRepository;
    }

    /////GET::Services
    public List<ReceiptResponseAdminDto> findAllReceipts() {
        try {
            List<ReceiptResponseAdminDto> rrdList = new ArrayList<>();
            receiptRepository.findAll().forEach(c -> {
                rrdList.add(new ReceiptResponseAdminDto(c.getTrackingCode(),
                        c.getProduct().getName(),
                        c.getPrice(),
                        c.getUser().getUsername(),
                        c.getAddress()));
            });
            return rrdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public ReceiptResponseDto findById(Long trackingCode) {
        Receipt c = getById(trackingCode);
        return new ReceiptResponseDto(c.getTrackingCode(),
                c.getProduct().getName(),
                c.getPrice(),
                c.getAddress());
    }

    public Receipt getById(Long trackingCode) {
        Receipt receipt = receiptRepository.findById(trackingCode).orElse(null);
        if (receipt == null)
            throw new NotFoundObjectException();
        return receipt;
    }

    public List<ReceiptResponseDto> findAllByTrackingCode(Long trackingCode) {
        try {
            List<ReceiptResponseDto> rrdList = new ArrayList<>();
            receiptRepository.findAllByTrackingCodeContains(trackingCode)
                    .forEach(c -> {
                        rrdList.add(new ReceiptResponseDto(c.getTrackingCode(),
                                c.getProduct().getName(),
                                c.getPrice(),
                                c.getAddress()));
                    });
            return rrdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    /////PUT::Services
    public void updateReceipt(ReceiptRequestDto rrd) {
        Receipt existingReceipt = getById(rrd.getTrackingId());
        if (rrd.getStatus() == null)
            throw new NullValueException();
        existingReceipt.setStatus(rrd.getStatus());
        receiptRepository.save(existingReceipt);
    }
}
