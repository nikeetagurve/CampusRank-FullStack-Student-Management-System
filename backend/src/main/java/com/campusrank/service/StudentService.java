package com.campusrank.service;
import com.campusrank.dto.StudentDtos.*;
import com.campusrank.model.*;
import com.campusrank.repository.*;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
public class StudentService {
 private final StudentRepository students; private final UserRepository users; private final PointTransactionRepository transactions;
 public StudentService(StudentRepository s,UserRepository u,PointTransactionRepository t){students=s;users=u;transactions=t;}
 public Page<StudentView> leaderboard(int page,int size,String direction){
  Pageable p=PageRequest.of(Math.max(0,page),Math.min(Math.max(1,size),50),Sort.by("totalPoints").descending());
  Page<StudentProfile> result=students.findAll(PageRequest.of(Math.max(0,page),Math.min(Math.max(1,size),50),Sort.by(direction.equalsIgnoreCase("asc")?Sort.Direction.ASC:Sort.Direction.DESC,"totalPoints").and(Sort.by("id"))));
  return result.map(s->view(s,rankOf(s.getId())));
 }
 public StudentView myProfile(String email){
  AppUser u=users.findByEmail(email).orElseThrow(()->new IllegalArgumentException("User not found"));
  StudentProfile s=students.findByUserId(u.getId()).orElseThrow(()->new IllegalArgumentException("Student profile not found"));
  return view(s,rankOf(s.getId()));
 }
 public StudentView getStudent(Long id){StudentProfile s=students.findById(id).orElseThrow(()->new IllegalArgumentException("Student not found"));return view(s,rankOf(id));}
 @Transactional public StudentView award(Long id,String teacherEmail,AwardRequest req){
  StudentProfile s=students.findById(id).orElseThrow(()->new IllegalArgumentException("Student not found"));
  AppUser teacher=users.findByEmail(teacherEmail).orElseThrow(()->new IllegalArgumentException("Teacher not found"));
  s.setTotalPoints(s.getTotalPoints()+req.points());students.save(s);
  PointTransaction tx=new PointTransaction();tx.setStudent(s);tx.setTeacher(teacher);tx.setPoints(req.points());tx.setReason(req.reason().trim());transactions.save(tx);
  return view(s,rankOf(id));
 }
 public Page<TransactionView> transactions(Long id,int page,int size){
  if(!students.existsById(id))throw new IllegalArgumentException("Student not found");
  return transactions.findByStudentIdOrderByCreatedAtDesc(id,PageRequest.of(Math.max(0,page),Math.min(Math.max(1,size),50)))
   .map(t->new TransactionView(t.getId(),t.getPoints(),t.getReason(),t.getTeacher().getFullName(),t.getCreatedAt()));
 }
 private int rankOf(Long id){var all=students.findAll(Sort.by(Sort.Order.desc("totalPoints"),Sort.Order.asc("id")));int rank=1;for(var s:all){if(s.getId().equals(id))return rank;rank++;}return rank;}
 private StudentView view(StudentProfile s,int rank){return new StudentView(s.getId(),s.getUser().getId(),s.getUser().getFullName(),s.getUser().getEmail(),s.getDepartment(),s.getYearOfStudy(),s.getTotalPoints(),rank);}
}
