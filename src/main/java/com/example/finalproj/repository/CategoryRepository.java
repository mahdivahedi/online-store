package com.example.finalproj.repository;

import com.example.finalproj.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findCategoryByCategoryName(String categoryName);
}
