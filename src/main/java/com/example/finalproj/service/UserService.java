package com.example.finalproj.service;

import com.example.finalproj.dto.requestDto.UserBuyingRequestDto;
import com.example.finalproj.dto.requestDto.UserRequestDto;
import com.example.finalproj.dto.responseDto.ReceiptResponseDto;
import com.example.finalproj.dto.responseDto.UserBuyingResponseDto;
import com.example.finalproj.dto.responseDto.UserResponseDto;
import com.example.finalproj.entity.Product;
import com.example.finalproj.entity.Receipt;
import com.example.finalproj.entity.ReceiptStatus;
import com.example.finalproj.entity.User;
import com.example.finalproj.exception.*;
import com.example.finalproj.repository.ProductRepository;
import com.example.finalproj.repository.ReceiptRepository;
import com.example.finalproj.repository.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final ReceiptRepository receiptRepository;

    public UserService(UserRepository repository, ProductRepository productRepository, ReceiptRepository receiptRepository) {
        this.userRepository = repository;
        this.productRepository = productRepository;
        this.receiptRepository = receiptRepository;
    }

    ////// GET::Services
    public List<UserResponseDto> findAll() {
        try {
            List<UserResponseDto> urdList = new ArrayList<>();
            userRepository.findAll().forEach(c -> {
                urdList.add(new UserResponseDto(c.getUsername(),
                        c.getFirstName(),
                        c.getLastName(),
                        c.getAddress(),
                        c.getAccountCharge()));
            });
            return urdList;
        } catch (RuntimeException re) {
            throw new DatabaseException();
        }
    }

    public List<ReceiptResponseDto> findAllUserReceipts(String username) {
        try {
            List<ReceiptResponseDto> urdList = new ArrayList<>();
            getByUsername(username).getReceipts().forEach(c -> {
                urdList.add(new ReceiptResponseDto(c.getTrackingCode(),
                        c.getProduct().getName(),
                        c.getPrice(),
                        c.getAddress()));
            });
            return urdList;
        } catch (RuntimeException re) {
            throw new DatabaseException();
        }
    }

    public User findByUsername(String username) {
        return getByUsername(username);
    }


    public User getByUsername(String username) {
        User user = userRepository.findById(username).orElse(null);
        if (user == null)
            throw new NotFoundObjectException();
        return user;
    }

    /////// POST::Services
    public void saveUser(UserRequestDto urd) {
        if (!urd.getUsername().contains("@"))
            throw new EmailException();
        if ("".equals(urd.getFirstName()) || urd.getFirstName() == null
                || "".equals(urd.getLastName()) || urd.getLastName() == null
                || "".equals(urd.getUsername()) || urd.getUsername() == null
                || "".equals(urd.getPassword()) || urd.getPassword() == null)
            throw new NullValueException(5);
        if (userRepository.findById(urd.getUsername()).isPresent())
            throw new RepeatedException(6);
        User user = new User();
        user.setUsername(urd.getUsername());
        user.setFirstName(urd.getFirstName());
        user.setLastName(urd.getLastName());
        user.setAddress(urd.getAddress());
        user.setPassword(urd.getPassword());
        userRepository.save(user);
    }

    public UserBuyingResponseDto buyingProduct(UserBuyingRequestDto ubd) {
        Product product = getById(ubd.getProductId());
        User user = getByUsername(ubd.getUsername());
        int cost = ubd.getQuantity() * product.getPrice();
        if (cost > user.getAccountCharge()) throw new MoneyAmountException();
        if (ubd.getQuantity() > product.getInventory()) throw new LowInventoryProductException();
        product.setSold(product.getSold() + ubd.getQuantity());
        product.setInventory(product.getInventory() - ubd.getQuantity());
        user.setAccountCharge(user.getAccountCharge() - cost);
        Receipt receipt = new Receipt();
        receipt.setProduct(product);
        receipt.setUser(user);
        receipt.setQuantity(ubd.getQuantity());
        receipt.setAddress(user.getAddress());
        receipt.setDate(new Date());
        receipt.setStatus(ReceiptStatus.DONE);
        userRepository.save(user);
        productRepository.save(product);
        receiptRepository.save(receipt);
        return new UserBuyingResponseDto(receipt.getTrackingCode()
                , receipt.getProduct().getName()
                , receipt.getProduct().getId()
                , receipt.getUser().getUsername()
                , receipt.getQuantity()
                , receipt.getAddress()
                , receipt.getPrice()
                , receipt.getDate()
                , receipt.getStatus().toString());
    }

    private Product getById(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null)
            throw new NotFoundObjectException();
        return product;
    }

    /////PUT::Service
    public void updateUser(UserRequestDto urd) {
        if (urd.getUsername() == null || "".equals(urd.getUsername()))
            throw new NullValueException();
        User existingProduct = getByUsername(urd.getUsername());
        if (urd.getFirstName() != null && !"".equals(urd.getFirstName()))
            existingProduct.setFirstName(urd.getFirstName());
        if (urd.getLastName() != null && !"".equals(urd.getLastName()))
            existingProduct.setLastName(urd.getLastName());
        if (urd.getAddress() != null && !"".equals(urd.getAddress()))
            existingProduct.setAddress(urd.getAddress());
        if (urd.getPassword() != null && !"".equals(urd.getPassword()))
            existingProduct.setPassword(urd.getPassword());
        userRepository.save(existingProduct);
    }

    public void increaseCharge(UserRequestDto urd) {
        if (urd.getUsername() == null || "".equals(urd.getUsername()))
            throw new NullValueException();
        User existingProduct = getByUsername(urd.getUsername());
        existingProduct.setAccountCharge(existingProduct.getAccountCharge() + urd.getAmount());
        userRepository.save(existingProduct);
    }


    ////// DELETE::Service
    public void deleteById(String username) {
        User user = getByUsername(username);
        userRepository.deleteById(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        if (checkAdmin(username)) authorities.add(new SimpleGrantedAuthority("ADMIN"));
        else authorities.add(new SimpleGrantedAuthority("USER"));
        return new org.springframework.security.core.userdetails.User(username,
                getByUsername(username).getPassword(), authorities);
    }

    private boolean checkAdmin(String username) {
        String password = getByUsername(username).getPassword();
        return "admin@admin.ir".equals(username) && "1234567a".equals(password);
    }
}
