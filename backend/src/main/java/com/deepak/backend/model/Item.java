package com.deepak.backend.model;

import lombok.Data;

@Data
public class Item {
    private String name;
    private int qty;
    private double amount;
    private String description;
}