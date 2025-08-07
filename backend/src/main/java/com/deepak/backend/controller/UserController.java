package com.deepak.backend.controller;

import com.deepak.backend.model.User;
import com.deepak.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<Object> createUser(@RequestBody User user, Authentication authentication) {
        try {
            if (!authentication.getName().equals(user.getClerkId())) {
                throw new Exception("User does not have permission");
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(user));
        } catch (Exception e) {
            Map<String,Object> error = new HashMap<>();
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}