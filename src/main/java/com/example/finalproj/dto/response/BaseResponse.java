package com.example.finalproj.dto.response;

import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public abstract class BaseResponse {

    private int responseCode;
    private final String message;
    private final static Map<Integer, String> responseCodeMessage;
    static {
        responseCodeMessage = new HashMap<>();
        responseCodeMessage.put(0, "Successful");
        responseCodeMessage.put(1, "Object successfully created.");
        responseCodeMessage.put(2, "Object successfully updated.");
        responseCodeMessage.put(3, "Object successfully deleted.");
        responseCodeMessage.put(4, "Username must be an email.");
        responseCodeMessage.put(5, "Null value exception occurred.");
        responseCodeMessage.put(6, "This username is used before.");
        responseCodeMessage.put(7, "The category name is used before.");
        responseCodeMessage.put(8, "Database is unavailable");
        responseCodeMessage.put(9, "This object not exist in database.");
        responseCodeMessage.put(10, "The Id can not be null.");
        responseCodeMessage.put(11, "This product is inserted before.");
        responseCodeMessage.put(12, "The quantity must be greater than zero.");
        responseCodeMessage.put(13, "Incorrect username or password.");
        responseCodeMessage.put(14, "The amount of user money is low.");
        responseCodeMessage.put(15, "The quantity of this product is less than your request.");
        responseCodeMessage.put(16, "The foreign key not exist.");
        responseCodeMessage.put(200, "Internal service error");
        responseCodeMessage.put(300, "Service unavailable");
        responseCodeMessage.put(400, "Request method not supported.");
        responseCodeMessage.put(500, "Media type not supported.");
        responseCodeMessage.put(600, "Media type not acceptable.");
        responseCodeMessage.put(700, "URL is wrong.");
        responseCodeMessage.put(800, "ISO code is null.");
        responseCodeMessage.put(900, "Invalid ISO code parameter");
        responseCodeMessage.put(100, "Invalid UUID parameter");
        responseCodeMessage.put(110, "Invalid account number parameter");
        responseCodeMessage.put(404, "Bad request.");
    }

    public BaseResponse(int responseCode) {
        this.responseCode = responseCode;
        this.message = responseCodeMessage.get(responseCode);
    }

    public BaseResponse(int responseCode, String message) {
        this.responseCode = responseCode;
        this.message = message;
    }
}
