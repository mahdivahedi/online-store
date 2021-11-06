package com.example.finalproj.controller;

import com.example.finalproj.dto.requestDto.CategoryRequestDto;
import com.example.finalproj.dto.response.BaseResponse;
import com.example.finalproj.dto.response.SuccessResponse;
import com.example.finalproj.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/getById/{id}")
    public BaseResponse getCategoryById(@PathVariable Long id) {
        List<Object> category = new ArrayList<>();
        category.add(categoryService.findById(id));
        return new SuccessResponse(0, category);
    }

    @GetMapping("/getAll")
    public BaseResponse getAllCategories() {
        List<Object> categories = new ArrayList<>(categoryService.findAllCategories());
        return new SuccessResponse(0, categories);
    }

    @GetMapping("/sortById")
    public BaseResponse getAllCategoriesSorted() {
        List<Object> categories = new ArrayList<>(categoryService.findAllCategoriesSortedDesc());
        return new SuccessResponse(0, categories);
    }

    @GetMapping("/test")
    public BaseResponse getTest() {
        List<Object> categories = new ArrayList<>(categoryService.test());
        return new SuccessResponse(0, categories);
    }

    @PostMapping("/add")
    public BaseResponse saveCategory(@RequestBody CategoryRequestDto category) {
        categoryService.saveCategory(category);
        List<Object> categories = new ArrayList<>();
        categories.add(category);
        return new SuccessResponse(1, categories);
    }

    @PutMapping("/update")
    public BaseResponse updateCategory(@RequestBody CategoryRequestDto category) {
        List<Object> categories = new ArrayList<>();
        categories.add(categoryService.updateCategory(category));
        return new SuccessResponse(2, categories);
    }

    @DeleteMapping("/delete")
    public BaseResponse deleteCategory(@RequestParam Long id) {
        categoryService.deleteById(id);
        return new SuccessResponse(3);
    }
}
