package com.deepak.backend.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class EmailService {
    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;


    private final JavaMailSender mailSender;

    public void sendInvoiceEmail(String toEmail, MultipartFile file) throws MessagingException , IOException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage,true);
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setFrom(fromEmail);
        mimeMessageHelper.setSubject("Your Invoice");
        mimeMessageHelper.setText("Dear Customer,\n\nPlease find your invoice attached.\n\nThank you!");
        String fileName = "invoice_"+System.currentTimeMillis()+".pdf";
        mimeMessageHelper.addAttachment(Objects.requireNonNull(file.getOriginalFilename()), new ByteArrayResource(file.getBytes()));
        mailSender.send(mimeMessage);
    }
}


//✅ MimeMessage:
//It is used to create a complete email with subject, body, and attachments.
//
//Think of it like the blank email page in Gmail before you type anything.
//
//        ✅ MimeMessageHelper:
//It's a helper class that makes it easy to fill in the email.
//
//It helps you set the "to", "from", subject, body text, and add attachments.
//
//It wraps the MimeMessage and provides simple methods to work with.
//
//🧠 Real-life Example:
//Imagine you are sending an email with a PDF invoice attached:
//
//MimeMessage is like the email structure.
//
//MimeMessageHelper is your assistant who helps you:
//
//Write the subject.
//
//Add a message.
//
//Attach the PDF.
//
//Send it to the correct person.