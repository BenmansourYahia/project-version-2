package com.sofisoft.retailmanagement.controller;

import com.sofisoft.retailmanagement.entity.User;
import com.sofisoft.retailmanagement.repository.UserRepository;
import com.sofisoft.retailmanagement.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<User> user = userRepository.findByEmailWithStores(userPrincipal.getEmail());
        if (user.isPresent()) {
            User currentUser = user.get();
            // Don't return password
            currentUser.setPassword(null);
            return ResponseEntity.ok(currentUser);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/me")
    public ResponseEntity<User> updateCurrentUser(@RequestBody User userDetails) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        
        Optional<User> optionalUser = userRepository.findByEmail(userPrincipal.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setNom(userDetails.getNom());
            user.setPrenom(userDetails.getPrenom());
            user.setTelephone(userDetails.getTelephone());
            user.setDescription(userDetails.getDescription());
            User updatedUser = userRepository.save(user);
            updatedUser.setPassword(null); // Don't return password
            return ResponseEntity.ok(updatedUser);
        }
        return ResponseEntity.notFound().build();
    }
}