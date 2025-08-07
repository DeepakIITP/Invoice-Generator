package com.deepak.backend.controller;

import com.deepak.backend.model.User;
import com.deepak.backend.service.UserService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.svix.Webhook;
import com.svix.exceptions.WebhookVerificationException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.http.HttpHeaders;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/webhooks")
@RequiredArgsConstructor
public class ClerkWebHookController {
    @Value("${clerk.webhook.secret}")
    private String webHookSecret;

    private final UserService userService;

    @PostMapping("/clerk")
    public ResponseEntity<Object> handleClerkWebHook(@RequestHeader("svix-id") String svixId,
                                                               @RequestHeader("svix-timestamp") String svixTimeStamp,
                                                               @RequestHeader("svix-signature") String svixSignature,
                                                               @RequestBody String payload) {

        try{
            Map<String,Object> error = new HashMap<>();
       boolean isValid=verifyWebHookSignature(svixId,svixTimeStamp,svixSignature,payload);
       if(!isValid){
           error.put("message", "Invalid WebHook Signature");
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                   .body(error);
       }
       ObjectMapper objectMapper=new ObjectMapper();
       JsonNode jsonNode=objectMapper.readTree(payload);
       String eventType=jsonNode.path("type").asText();
       switch (eventType){
           case "user.created":
               handleUserCreated(jsonNode.path("data"));
               break;
           case "user.updated":
               handleUserUpdated(jsonNode.path("data"));
               break;
           case "user.deleted":
               handleUserDeleted(jsonNode.path("data"));
               break;

       }
       return ResponseEntity.ok().build();

        } catch (Exception e){
            Map<String,Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(error);

        }


    }

    private void handleUserDeleted(JsonNode data) {
        String clerkId=data.get("id").asText();
        userService.deleteUserByClerkId(clerkId);
    }

    private void handleUserUpdated(JsonNode data) {
        String clerkId=data.get("id").asText();
        User existingUser=userService.getUserByClerkId(clerkId);
        existingUser.setEmail(data.path("email_addresses").path(0).path("email_address").asText());
        existingUser.setPhotoUrl(data.path("image_url").asText());
        userService.saveUser(existingUser);
    }

    private void handleUserCreated(JsonNode data) {
        User user=User.builder()
                .clerkId(data.path("id").asText())
                .email(data.path("email_addresses").path(0).path("email_address").asText())
                .photoUrl(data.path("image_url").asText())
                .build();
        userService.saveUser(user);
    }

    private boolean verifyWebHookSignature(String svixId, String svixTimestamp, String svixSignature, String payload) {
        try {
            Webhook webhook = new Webhook(webHookSecret); // your Clerk secret

            // Convert individual header values to java.net.http.HttpHeaders
            Map<String, List<String>> headerMap = Map.of(
                    "svix-id", List.of(svixId),
                    "svix-timestamp", List.of(svixTimestamp),
                    "svix-signature", List.of(svixSignature)
            );

            HttpHeaders httpHeaders = HttpHeaders.of(headerMap, (k, v) -> true);

            webhook.verify(payload, httpHeaders); // will throw if invalid
            return true;
        } catch (WebhookVerificationException e) {
            System.err.println("Signature verification failed: " + e.getMessage());
            return false;
        }
    }

}

//In short:
//It validates the webhook request to ensure it’s really from Clerk and hasn’t been tampered with.
//
//This is crucial for security so you don't process fake or malicious webhook payloads.




//| Header           | Simple Explanation                                                                                 |
//        | ---------------- | -------------------------------------------------------------------------------------------------- |
//        | `svix-id`        | A **unique ID** for this webhook message — so you know which message it is.                        |
//        | `svix-timestamp` | The **exact time** the webhook was sent — helps you check if it’s recent or old.                   |
//        | `svix-signature` | A **security code** used to **verify** that the message really came from Clerk and wasn’t changed. |


//1. How Webhooks Work
//Imagine you have a doorbell at your friend’s house.
//
//When someone rings the doorbell, your friend gets notified instantly.
//
//        Here, your friend’s house is your app/server.
//
//The doorbell is the webhook.
//
//When an event happens somewhere else (like a user signs up), that system "rings your doorbell" by sending a message (HTTP POST request) to your app.
//
//Your app listens for this "ring" and then takes action, like sending a welcome email or updating the database.
//
//So, webhook = automatic message sent to your app when something happens elsewhere.
//
//        2. How Clerk Uses Webhooks
//Clerk is a service that manages user signups, logins, etc.
//
//When something important happens in Clerk (like a user registers, or updates their profile), Clerk sends a webhook to your backend server.
//
//Your backend server receives that webhook (the “ringing doorbell”) and knows that something changed on Clerk.
//
//Your backend then can update its own records — like adding the new user to your database.
//
//To make sure this webhook is really from Clerk (and not from someone else), Clerk signs the webhook message with a secret key.
//
//Your backend uses that secret to verify the webhook signature — like checking the return address on a letter.
//
//        If verified, your backend trusts the webhook and acts on it.
//