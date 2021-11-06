package com.example.finalproj.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long trackingCode;
    @ManyToOne
    @JoinColumn(name = "product_id")
    @JsonIgnore
    private Product product;
    @ManyToOne
    @JoinColumn(name = "username")
    @JsonIgnore
    private User user;
    @Basic(optional = false)
    @JsonIgnore
    private int quantity;
    @Basic(optional = false)
    private int price;
    @Basic(optional = false)
    private String address;
    @CreatedDate
    private Date date;
    @Enumerated(EnumType.STRING)
    @JsonIgnore
    private ReceiptStatus status;
}
