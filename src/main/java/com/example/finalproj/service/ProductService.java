package com.example.finalproj.service;

import com.example.finalproj.dto.requestDto.ProductRequestDto;
import com.example.finalproj.dto.responseDto.ProductResponseDto;
import com.example.finalproj.entity.Category;
import com.example.finalproj.entity.Product;
import com.example.finalproj.exception.*;
import com.example.finalproj.repository.CategoryRepository;
import com.example.finalproj.repository.ProductRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository repository, CategoryRepository categoryRepository) {
        this.productRepository = repository;
        this.categoryRepository = categoryRepository;
    }

    /////GET::Services
    public List<ProductResponseDto> findAllProducts() {
        try {
            List<ProductResponseDto> prdList = new ArrayList<>();
            productRepository.findAll().forEach(c -> {
                prdList.add(new ProductResponseDto(c.getId(),
                        c.getName(),
                        c.getCategory().getId(),
                        c.getCategory().getCategoryName(),
                        c.getInventory(),
                        c.getSold(),
                        c.getPrice(),
                        c.getProductImage()));
            });
            return prdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public List<ProductResponseDto> findAllProductsSortedByPrice() {
        try {
            List<ProductResponseDto> prdList = new ArrayList<>();
            productRepository.findAll(Sort.by("price").descending()).forEach(c -> {
                prdList.add(new ProductResponseDto(c.getId(),
                        c.getName(),
                        c.getCategory().getId(),
                        c.getCategory().getCategoryName(),
                        c.getInventory(),
                        c.getSold(),
                        c.getPrice(),
                        c.getProductImage()));
            });
            return prdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public List<ProductResponseDto> findAllProductsSortedBySold() {
        try {
            List<ProductResponseDto> prdList = new ArrayList<>();
            productRepository.findAll(Sort.by("sold").descending()).forEach(c -> {
                prdList.add(new ProductResponseDto(c.getId(),
                        c.getName(),
                        c.getCategory().getId(),
                        c.getCategory().getCategoryName(),
                        c.getInventory(),
                        c.getSold(),
                        c.getPrice(),
                        c.getProductImage()));
            });
            return prdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }


    public ProductResponseDto findById(Long id) {
        Product product = getById(id);
        return new ProductResponseDto(product.getId(),
                product.getName(),
                product.getCategory().getId(),
                product.getCategory().getCategoryName(),
                product.getInventory(),
                product.getSold(),
                product.getPrice(),
                product.getProductImage());
    }

    public Product getById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null)
            throw new NotFoundObjectException();
        return product;
    }

    public List<ProductResponseDto> findProductByNameContains(String productName) {
        try {
            List<ProductResponseDto> prdList = new ArrayList<>();
            productRepository.findProductByNameContains(productName).forEach(c -> {
                prdList.add(new ProductResponseDto(c.getId(),
                        c.getName(),
                        c.getCategory().getId(),
                        c.getCategory().getCategoryName(),
                        c.getInventory(),
                        c.getSold(),
                        c.getPrice(),
                        c.getProductImage()));
            });
            return prdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }

    public List<ProductResponseDto> searchByPrice(int low, int height) {
        try {
            List<ProductResponseDto> prdList = new ArrayList<>();
            productRepository.findProductByPriceBetween(low, height).forEach(c -> {
                prdList.add(new ProductResponseDto(c.getId(),
                        c.getName(),
                        c.getCategory().getId(),
                        c.getCategory().getCategoryName(),
                        c.getInventory(),
                        c.getSold(),
                        c.getPrice(),
                        c.getProductImage()));
            });
            return prdList;
        } catch (RuntimeException e) {
            throw new DatabaseException();
        }
    }


    //////POST::Services
    public void saveProduct(ProductRequestDto prd) {
        Product product = new Product();
        if ("".equals(prd.getName()) || prd.getName() == null)
            throw new NullValueException(5);
        if (prd.getCategoryId() != null) {
            Category category = categoryRepository.findById(prd.getCategoryId()).orElse(null);
            if (category == null) {
                throw new ForeignKeyException();
            }
            product.setCategory(category);
        }else {
            Category category = categoryRepository.findCategoryByCategoryName("دسته بندی نشده").orElse(null);
            if (category == null) {
                category = new Category();
                category.setCategoryName("دسته بندی نشده");
                categoryRepository.save(category);
                product.setCategory(category);
            }else product.setCategory(category);
        }
        product.setProductImage(prd.getProductImage());
        product.setPrice(prd.getPrice());
        product.setName(prd.getName());
        product.setInventory(prd.getInventory());
        product.setSold(0);
        productRepository.save(product);
    }

    /////PUT::Services
    public void updateProduct(ProductRequestDto prd) {
        if (prd.getId() == null)
            throw new NullValueException(10);
        Product existingProduct = getById(prd.getId());
        if (prd.getName() != null && !"".equals(prd.getName()))
            existingProduct.setName(prd.getName());
        if (prd.getProductImage() != null && !"".equals(prd.getProductImage()))
            existingProduct.setProductImage(prd.getProductImage());
        if (prd.getPrice() != existingProduct.getPrice() && prd.getPrice() != 0)
            existingProduct.setPrice(prd.getPrice());
        if (prd.getInventory() != existingProduct.getInventory())
            existingProduct.setInventory(prd.getInventory());
        try {
            productRepository.save(existingProduct);
        } catch (RuntimeException re) {
            throw new RepeatedException(7);
        }
    }

    /////DELETE::Service
    public void deleteById(Long id) {
        Product product = getById(id);
        productRepository.deleteById(id);
    }
}
