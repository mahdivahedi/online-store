package com.example.finalproj.dto.response;

import java.util.ArrayList;
import java.util.List;

public class SuccessResponse extends BaseResponse{

    private List<Object> data;

    public SuccessResponse(int responseCode) {
        super(responseCode);
        this.data = new ArrayList<>();
    }

    public SuccessResponse(int responseCode, List<Object> data) {
        super(responseCode);
        this.data = data;
    }

    public List<Object> getData() {
        return data;
    }

    public void setData(List<Object> data) {
        this.data = data;
    }
}
