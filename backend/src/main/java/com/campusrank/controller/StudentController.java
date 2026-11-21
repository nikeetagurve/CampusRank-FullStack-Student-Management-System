package com.campusrank.controller;
import com.campusrank.dto.StudentDtos.*;
import com.campusrank.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1")
public class StudentController {
 private final StudentService service;public StudentController(StudentService s){service=s;}
 @GetMapping("/leaderboard") public Page<StudentView> leaderboard(@RequestParam(defaultValue="0")int page,@RequestParam(defaultValue="10")int size,@RequestParam(defaultValue="desc")String direction){return service.leaderboard(page,size,direction);}
 @GetMapping("/students/me") @PreAuthorize("hasRole('STUDENT')") public StudentView me(Authentication a){return service.myProfile(a.getName());}
 @GetMapping("/students/{id}") @PreAuthorize("hasRole('TEACHER')") public StudentView get(@PathVariable Long id){return service.getStudent(id);}
 @PostMapping("/students/{id}/points") @PreAuthorize("hasRole('TEACHER')") public StudentView award(@PathVariable Long id,Authentication a,@Valid @RequestBody AwardRequest r){return service.award(id,a.getName(),r);}
 @GetMapping("/students/{id}/transactions") public Page<TransactionView> transactions(@PathVariable Long id,@RequestParam(defaultValue="0")int page,@RequestParam(defaultValue="10")int size,Authentication a){
  // Students can only inspect their own transaction history.
  if(a.getAuthorities().stream().anyMatch(x->x.getAuthority().equals("ROLE_STUDENT"))){
   var own=service.myProfile(a.getName());if(!own.id().equals(id))throw new org.springframework.security.access.AccessDeniedException("You can only view your own transactions");
  }
  return service.transactions(id,page,size);
 }
}
