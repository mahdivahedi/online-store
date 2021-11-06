package com.example.finalproj.dto.response;

public class ErrorResponse extends BaseResponse{

    public ErrorResponse(int responseCode) {
        super(responseCode);

    }

    public ErrorResponse(int responseCode, String message) {
        super(responseCode, message);
    }

}
