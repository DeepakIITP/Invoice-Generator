package com.deepak.backend.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Data
@Document(collection = "invoices")
public class Invoice {
    @Id
    private String id;
    private String clerkId;
    private Company company;
    private Billing billing;
    private Shipping shipping;
    private InvoiceDetails invoice;
    private List<Item> items;
    private String notes;
    private String logo;
    private double tax;
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant lastUpdatedAt;
    private String title;
    private String template;
    private String thumbnailUrl;
}


//✅ Instant
//Stores the exact and correct moment in time — in UTC (universal time).
//
//It's like a timestamp on a CCTV camera — precise and not affected by time zones.
//
//Always accurate across countries and systems.
//
//❌ LocalDateTime
//Only stores date and time, but without time zone.
//
//So it might be misleading if different people in different places use it — because it doesn't know where that time applies.