package com.example.finalproj.repository;

import com.example.finalproj.entity.Receipt;
import com.example.finalproj.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, String> {
    List<Receipt> findReceiptsByUsername(String username);
    List<Receipt> findAllByUsername(String username);
    @Query(value = "select * from user where username=1?", nativeQuery = true)
    List<Receipt> findAllReceipts(String username);
}
