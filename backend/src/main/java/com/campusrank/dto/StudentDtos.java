package com.campusrank.dto;
import jakarta.validation.constraints.*;
import java.time.Instant;
public class StudentDtos {
 public record StudentView(Long id,Long userId,String fullName,String email,String department,Integer yearOfStudy,Integer totalPoints,Integer rank) {}
 public record AwardRequest(@Min(1) @Max(1000) Integer points,@NotBlank @Size(max=250) String reason) {}
 public record TransactionView(Long id,Integer points,String reason,String teacherName,Instant createdAt) {}
}
