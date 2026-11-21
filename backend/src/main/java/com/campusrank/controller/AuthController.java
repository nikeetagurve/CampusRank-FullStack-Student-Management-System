package com.campusrank.controller;
import com.campusrank.dto.AuthDtos.*;
import com.campusrank.model.AppUser;
import com.campusrank.repository.UserRepository;
import com.campusrank.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1/auth")
public class AuthController {
 private final AuthService service;private final UserRepository users;
 public AuthController(AuthService s,UserRepository u){service=s;users=u;}
 @PostMapping("/register") @ResponseStatus(org.springframework.http.HttpStatus.CREATED) public AuthResponse register(@Valid @RequestBody RegisterRequest r){return service.register(r);}
 @PostMapping("/login") public AuthResponse login(@Valid @RequestBody LoginRequest r){return service.login(r);}
 @GetMapping("/me") public UserView me(Authentication a){AppUser u=users.findByEmail(a.getName()).orElseThrow();return new UserView(u.getId(),u.getFullName(),u.getEmail(),u.getRole());}
}
