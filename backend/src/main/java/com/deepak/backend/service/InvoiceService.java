package com.deepak.backend.service;

import com.deepak.backend.model.Invoice;
import com.deepak.backend.repo.InvoiceRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InvoiceService {
    private final InvoiceRepo invoiceRepo;

    public Invoice createInvoice(Invoice invoice) {
        return invoiceRepo.save(invoice);
    }


    public List<Invoice> fetchInvoices(String clerkId) {
        return invoiceRepo.findByClerkId(clerkId);
    }

    public void deleteInvoice(String invoiceId,String clerkId) {
        Invoice invoice = invoiceRepo.findByClerkIdAndId(clerkId,invoiceId).orElseThrow(() -> new RuntimeException("Invoice not found"));
        invoiceRepo.delete(invoice);
    }


}