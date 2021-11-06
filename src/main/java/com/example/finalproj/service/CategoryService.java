package com.example.finalproj.service;

import com.example.finalproj.dto.requestDto.CategoryRequestDto;
import com.example.finalproj.dto.responseDto.CategoryResponseDto;
import com.example.finalproj.entity.Category;
import com.example.finalproj.entity.Product;
import com.example.finalproj.exception.DatabaseException;
import com.example.finalproj.exception.NotFoundObjectException;
import com.example.finalproj.exception.NullValueException;
import com.example.finalproj.exception.RepeatedException;
import com.example.finalproj.repository.CategoryRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    ////GET::Services
    public List<CategoryResponseDto> findAllCategories() {
        try {
            List<CategoryResponseDto> crdList = new ArrayList<>();
            categoryRepository.findAll().forEach(c -> {
                CategoryResponseDto crd = new CategoryResponseDto();
                crd.setId(c.getId());
                crd.setCategoryName(c.getCategoryName());
                crdList.add(crd);
            });
            return crdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public List<CategoryResponseDto> findAllCategoriesSortedDesc() {
        try {
            List<CategoryResponseDto> crdList = new ArrayList<>();
            categoryRepository.findAll(Sort.by("id").descending()).forEach(c -> {
                CategoryResponseDto crd = new CategoryResponseDto();
                crd.setId(c.getId());
                crd.setCategoryName(c.getCategoryName());
                crdList.add(crd);
            });
            return crdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public CategoryResponseDto findById(Long id) {
        Category category = getById(id);
        return new CategoryResponseDto(category.getId(), category.getCategoryName());
    }

    public Category getById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null)
            throw new NotFoundObjectException();
        return category;
    }


    /////POST::Services
    public void saveCategory(CategoryRequestDto crd) {
        try {
            Category category = new Category();
            if ("".equals(crd.getCategoryName())
                    || (crd.getCategoryName() == null))
                category.setCategoryName("دسته بندی نشده");
            else category.setCategoryName(crd.getCategoryName());
            categoryRepository.save(category);
        } catch (RuntimeException ce) {
            throw new RepeatedException(7);
        }
    }


    ////PUT::Services
    public CategoryResponseDto updateCategory(CategoryRequestDto crd) {
        if (crd.getId() == null) {
            throw new NullValueException(10);
        }
        Category existingCategory = getById(crd.getId());
        existingCategory.setCategoryName(crd.getCategoryName());
        try {
            Category category = categoryRepository.save(existingCategory);
            return new CategoryResponseDto(category.getId(), category.getCategoryName());
        } catch (RuntimeException re) {
            throw new RepeatedException(7);
        }
    }

    /////DELETE::Services
    public void deleteById(Long id) {
        Category category = getById(id);
        System.out.println(category.getProducts().size());
        for (Product p : category.getProducts()) {
            if(p.getCategory().getId().equals(id)) {
                p.getCategory().setId(1L);
                categoryRepository.save(category);
            }
        }
        categoryRepository.deleteById(id);
    }

    public List<Category> test() {
        return categoryRepository.findAll();
    }
}
