package com.campusrank.model;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="app_users")
public class AppUser {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String fullName;
 @Column(nullable=false,unique=true,length=180) private String email;
 @Column(nullable=false) private String passwordHash;
 @Enumerated(EnumType.STRING) @Column(nullable=false,length=20) private Role role;
 @Column(nullable=false) private Instant createdAt=Instant.now();
 public Long getId(){return id;} public String getFullName(){return fullName;} public void setFullName(String v){fullName=v;}
 public String getEmail(){return email;} public void setEmail(String v){email=v;}
 public String getPasswordHash(){return passwordHash;} public void setPasswordHash(String v){passwordHash=v;}
 public Role getRole(){return role;} public void setRole(Role v){role=v;}
 public Instant getCreatedAt(){return createdAt;}
}
