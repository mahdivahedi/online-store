package com.example.finalproj.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class User {
    @Id
    @Basic(optional = false)
    private String username;
    @Basic(optional = false)
    private String password;
    @Basic(optional = false)
    private String firstName;
    @Basic(optional = false)
    private String lastName;
    private String address;
    private int accountCharge;
    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
    private List<Receipt> receipts;
}
