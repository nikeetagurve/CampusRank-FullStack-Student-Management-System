package com.campusrank.model;
import jakarta.persistence.*;
@Entity @Table(name="student_profiles")
public class StudentProfile {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @OneToOne(fetch=FetchType.EAGER) @JoinColumn(name="user_id",nullable=false,unique=true) private AppUser user;
 @Column(nullable=false) private String department="Computer Science";
 @Column(nullable=false) private Integer yearOfStudy=1;
 @Column(nullable=false) private Integer totalPoints=0;
 public Long getId(){return id;} public AppUser getUser(){return user;} public void setUser(AppUser v){user=v;}
 public String getDepartment(){return department;} public void setDepartment(String v){department=v;}
 public Integer getYearOfStudy(){return yearOfStudy;} public void setYearOfStudy(Integer v){yearOfStudy=v;}
 public Integer getTotalPoints(){return totalPoints;} public void setTotalPoints(Integer v){totalPoints=v;}
}
