package com.example.finalproj.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Basic(optional = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;
    private int price;
    @Basic(optional = false)
    private int inventory;
    private int sold;
    private String productImage;
    @OneToMany(mappedBy = "product")
    private List<Receipt> receipts;
}
