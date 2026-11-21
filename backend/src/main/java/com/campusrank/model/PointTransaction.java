package com.campusrank.model;
import jakarta.persistence.*;
import java.time.Instant;
@Entity @Table(name="point_transactions")
public class PointTransaction {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @ManyToOne(optional=false) @JoinColumn(name="student_id") private StudentProfile student;
 @ManyToOne(optional=false) @JoinColumn(name="teacher_id") private AppUser teacher;
 @Column(nullable=false) private Integer points;
 @Column(nullable=false,length=250) private String reason;
 @Column(nullable=false) private Instant createdAt=Instant.now();
 public Long getId(){return id;} public StudentProfile getStudent(){return student;} public void setStudent(StudentProfile v){student=v;}
 public AppUser getTeacher(){return teacher;} public void setTeacher(AppUser v){teacher=v;}
 public Integer getPoints(){return points;} public void setPoints(Integer v){points=v;}
 public String getReason(){return reason;} public void setReason(String v){reason=v;}
 public Instant getCreatedAt(){return createdAt;}
}
