package com.campusrank.dto;
import com.campusrank.model.Role;
import jakarta.validation.constraints.*;
public class AuthDtos {
 public record RegisterRequest(@NotBlank @Size(max=120) String fullName,@NotBlank @Email String email,
   @NotBlank @Size(min=8,max=72) String password,@NotNull Role role,
   @Size(max=100) String department,@Min(1) @Max(8) Integer yearOfStudy) {}
 public record LoginRequest(@NotBlank @Email String email,@NotBlank String password) {}
 public record UserView(Long id,String fullName,String email,Role role) {}
 public record AuthResponse(String token,UserView user) {}
}
