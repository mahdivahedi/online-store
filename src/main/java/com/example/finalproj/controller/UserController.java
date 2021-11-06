package com.example.finalproj.controller;

import com.example.finalproj.dto.authenticationDto.RequestAuthenticationDto;
import com.example.finalproj.dto.authenticationDto.ResponseAuthenticationDto;
import com.example.finalproj.dto.requestDto.UserBuyingRequestDto;
import com.example.finalproj.dto.requestDto.UserRequestDto;
import com.example.finalproj.dto.response.BaseResponse;
import com.example.finalproj.dto.response.SuccessResponse;
import com.example.finalproj.entity.User;
import com.example.finalproj.exception.LoginAuthenticationException;
import com.example.finalproj.security.JwtUtil;
import com.example.finalproj.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("user")
public class UserController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final UserService userService;

    public UserController(AuthenticationManager authenticationManager
            , JwtUtil jwtTokenUtil, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userService = userService;
    }

    @GetMapping("/getAll")
    public BaseResponse getUsers() {
        List<Object> users = new ArrayList<>(userService.findAll());
        return new SuccessResponse(0, users);
    }

    @GetMapping("/getAllUserReceipts/{username}")
    public BaseResponse getUserByUsername(@PathVariable String username) {
        List<Object> receipts = new ArrayList<>();
        receipts.add(userService.findAllUserReceipts(username));
        return new SuccessResponse(0, receipts);
    }

    @PostMapping("/buy")
    public BaseResponse buyProduct(@RequestBody UserBuyingRequestDto ubd) {
        List<Object> receipts = new ArrayList<>();
        receipts.add(userService.buyingProduct(ubd));
        return new SuccessResponse(0, receipts);
    }

    @PostMapping("/add")
    public BaseResponse saveUser(@RequestBody UserRequestDto urd) {
        userService.saveUser(urd);
        return getBaseResponse(urd.getUsername());
    }

    @PostMapping("/login")
    public BaseResponse loginUser(@RequestBody RequestAuthenticationDto rad) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(rad.getUsername(),
                    rad.getPassword()));
        } catch (BadCredentialsException be) {
            throw new LoginAuthenticationException();
        }
        return getBaseResponse(rad.getUsername());
    }

    private BaseResponse getBaseResponse(String username) {
        final UserDetails userDetails = userService.loadUserByUsername(username);
        final String jwt = jwtTokenUtil.generateToken(userDetails);
        List<Object> res = new ArrayList<>();
        User user = userService.getByUsername(username);
        res.add(new ResponseAuthenticationDto(user.getUsername()
                , user.getFirstName()
                , user.getLastName()
                , user.getAddress()
                , user.getAccountCharge()
                , jwt));
        return new SuccessResponse(0, res);
    }

    @PutMapping("/update")
    public BaseResponse updateUser(@RequestBody UserRequestDto urd) {
        userService.updateUser(urd);
        return new SuccessResponse(2);
    }

    @PutMapping("/increaseCharge")
    public BaseResponse increaseCharge(@RequestBody UserRequestDto urd) {
        userService.increaseCharge(urd);
        return new SuccessResponse(2);
    }

    @DeleteMapping("/delete/{username}")
    public BaseResponse deleteUser(@PathVariable String username) {
        userService.deleteById(username);
        return new SuccessResponse(3);
    }
}
