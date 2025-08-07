package com.deepak.backend.controller;

import com.deepak.backend.model.Invoice;
import com.deepak.backend.service.EmailService;
import com.deepak.backend.service.InvoiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/invoices")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceService invoiceService;
    private final EmailService emailService;

    @PostMapping
    public ResponseEntity<Invoice> saveInvoice(@RequestBody Invoice invoice) {
        return ResponseEntity.ok(invoiceService.createInvoice(invoice));
    }

    @GetMapping
    public ResponseEntity<List<Invoice>> fetchInvoices(Authentication authentication) {
        return ResponseEntity.ok(invoiceService.fetchInvoices(authentication.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInvoice(@PathVariable String id,Authentication authentication) {
        if(authentication.getName()!=null) {
            invoiceService.deleteInvoice(id, authentication.getName());
            return ResponseEntity.noContent().build();
        }
         return ResponseEntity.notFound().build();
//        Sends back a response with:
//        Status code: 204
//        Body: Empty (no content)
    }

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestPart("file")MultipartFile file,@RequestPart("email") String email) {
       try{
           emailService.sendInvoiceEmail(email,file);
           return ResponseEntity.ok().body("Invoice Email Sent");
       }catch(Exception e){
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("failed to send invoice email");
       }
    }
}

//You use @RequestPart when:
//
//You're sending a file (like PDF, image) and
//
//You're also sending additional JSON data in the same HTTP request.