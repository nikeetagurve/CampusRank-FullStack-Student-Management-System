package com.campusrank.service;
import com.campusrank.dto.AuthDtos.*;
import com.campusrank.model.*;
import com.campusrank.repository.*;
import com.campusrank.security.JwtService;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class AuthService {
 private final UserRepository users; private final StudentRepository students; private final PasswordEncoder encoder;
 private final AuthenticationManager authManager; private final JwtService jwt;
 public AuthService(UserRepository u,StudentRepository s,PasswordEncoder e,AuthenticationManager a,JwtService j){users=u;students=s;encoder=e;authManager=a;jwt=j;}
 @Transactional public AuthResponse register(RegisterRequest r){
  String email=r.email().trim().toLowerCase();
  if(users.existsByEmail(email))throw new IllegalArgumentException("An account with this email already exists");
  AppUser u=new AppUser();u.setFullName(r.fullName().trim());u.setEmail(email);u.setPasswordHash(encoder.encode(r.password()));u.setRole(r.role());u=users.save(u);
  if(u.getRole()==Role.STUDENT){StudentProfile s=new StudentProfile();s.setUser(u);if(r.department()!=null&&!r.department().isBlank())s.setDepartment(r.department());if(r.yearOfStudy()!=null)s.setYearOfStudy(r.yearOfStudy());students.save(s);}
  return response(u);
 }
 public AuthResponse login(LoginRequest r){
  authManager.authenticate(new UsernamePasswordAuthenticationToken(r.email().trim().toLowerCase(),r.password()));
  return response(users.findByEmail(r.email().trim().toLowerCase()).orElseThrow());
 }
 public AuthResponse response(AppUser u){return new AuthResponse(jwt.generate(u.getEmail(),u.getRole().name()),new UserView(u.getId(),u.getFullName(),u.getEmail(),u.getRole()));}
}
