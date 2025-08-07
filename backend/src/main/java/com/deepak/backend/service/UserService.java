package com.deepak.backend.service;

import com.deepak.backend.model.User;
import com.deepak.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService  {
    private final UserRepo userRepo;

    public User saveUser(User userDto) {
        Optional<User> userEntity=userRepo.findByClerkId(userDto.getClerkId());
        if(userEntity.isPresent()){
            User user=userEntity.get();
            user.setEmail(userDto.getEmail());
            user.setPhotoUrl(userDto.getPhotoUrl());
            user= userRepo.save(user);
            return user;
        }
        return userRepo.save(userDto);
    }
    public void deleteUserByClerkId(String clerkId) {
        User userEntity = userRepo.findByClerkId(clerkId).orElseThrow(()->new UsernameNotFoundException("User not found"));
        userRepo.delete(userEntity);
    }

    public User getUserByClerkId(String clerkId) {
       return  userRepo.findByClerkId(clerkId).orElseThrow(()->new UsernameNotFoundException("User not found"));
    }




}