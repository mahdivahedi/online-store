package com.example.finalproj.repository;

import com.example.finalproj.entity.Product;
import com.example.finalproj.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findProductByNameContains(String productName);
    List<Product> findProductByPriceBetween(int low, int height);
    Optional<Product> findProductByName(String productName);
}
