package com.deepak.backend.repo;

import com.deepak.backend.model.Invoice;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InvoiceRepo extends MongoRepository<Invoice, String> {
    List<Invoice> findByClerkId(String clerkId);
    Optional<Invoice> findByClerkIdAndId(String clerkId, String id);
}

