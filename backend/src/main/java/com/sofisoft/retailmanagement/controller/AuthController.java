package com.sofisoft.retailmanagement.controller;

import com.sofisoft.retailmanagement.dto.JwtResponse;
import com.sofisoft.retailmanagement.dto.LoginRequest;
import com.sofisoft.retailmanagement.entity.User;
import com.sofisoft.retailmanagement.repository.UserRepository;
import com.sofisoft.retailmanagement.security.JwtUtils;
import com.sofisoft.retailmanagement.security.UserPrincipal;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findByEmailWithStores(userPrincipal.getEmail()).orElse(null);
        
        List<String> stores = user != null ? 
            user.getStores().stream().map(store -> store.getCode()).collect(Collectors.toList()) : 
            List.of();

        return ResponseEntity.ok(new JwtResponse(jwt,
                userPrincipal.getId(),
                userPrincipal.getEmail(),
                user != null ? user.getNom() : "",
                user != null ? user.getPrenom() : "",
                user != null ? user.getRole() : "",
                stores));
    }
}