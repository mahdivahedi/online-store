package com.example.finalproj.controller;

import com.example.finalproj.dto.requestDto.ProductRequestDto;
import com.example.finalproj.dto.response.BaseResponse;
import com.example.finalproj.dto.response.SuccessResponse;
import com.example.finalproj.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/getById/{id}")
    public BaseResponse getProductById(@PathVariable Long id) {
        List<Object> product = new ArrayList<>();
        product.add(productService.findById(id));
        return new SuccessResponse(0, product);
    }

    @GetMapping("/getAll")
    public BaseResponse getAllProducts()  {
        List<Object> products = new ArrayList<>(productService.findAllProductsSortedBySold());
        return new SuccessResponse(0, products);
    }

    @GetMapping("/getAllByPrice")
    public BaseResponse getAllProductsByPrice()  {
        List<Object> products = new ArrayList<>(productService.findAllProductsSortedByPrice());
        return new SuccessResponse(0, products);
    }

    @GetMapping("/search")
    public BaseResponse searchByProduct(@RequestParam String name) {
        List<Object> products = new ArrayList<>(productService.findProductByNameContains(name));
        return new SuccessResponse(0, products);
    }

    @GetMapping("/searchByPrice")
    public BaseResponse searchByProduct(@RequestParam int low, @RequestParam int height) {
        List<Object> products = new ArrayList<>(productService.searchByPrice(low, height));
        return new SuccessResponse(0, products);
    }


    @PostMapping("/add")
    public BaseResponse saveProduct(@RequestBody ProductRequestDto prd) {
        productService.saveProduct(prd);
        return new SuccessResponse(1);
    }

    @PutMapping("/update")
    public BaseResponse updateCategory(@RequestBody ProductRequestDto prd) {
        productService.updateProduct(prd);
        return new SuccessResponse(2);
    }

    @DeleteMapping("/delete/{id}")
    public BaseResponse deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
        return new SuccessResponse(3);
    }
}
