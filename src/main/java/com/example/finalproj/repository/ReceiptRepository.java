package com.example.finalproj.repository;

import com.example.finalproj.entity.Receipt;
import com.example.finalproj.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceiptRepository extends JpaRepository<Receipt, Long> {
    List<Receipt> findAllByUser(User user);
    List<Receipt> findAllByUserUsernameIs(String username);
    List<Receipt> findAllByTrackingCodeContains(Long trackingCode);
}
