package com.campusrank.exception;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.time.Instant;
import java.util.Map;
@RestControllerAdvice
public class GlobalExceptionHandler {
 @ExceptionHandler(MethodArgumentNotValidException.class) public ResponseEntity<?> validation(MethodArgumentNotValidException e,HttpServletRequest r){
  String msg=e.getBindingResult().getFieldErrors().stream().findFirst().map(x->x.getField()+": "+x.getDefaultMessage()).orElse("Invalid request");
  return build(HttpStatus.BAD_REQUEST,msg,r);
 }
 @ExceptionHandler(IllegalArgumentException.class) public ResponseEntity<?> bad(IllegalArgumentException e,HttpServletRequest r){return build(HttpStatus.BAD_REQUEST,e.getMessage(),r);}
 @ExceptionHandler(org.springframework.security.access.AccessDeniedException.class) public ResponseEntity<?> denied(Exception e,HttpServletRequest r){return build(HttpStatus.FORBIDDEN,"You do not have permission to perform this action",r);}
 @ExceptionHandler(org.springframework.security.core.AuthenticationException.class) public ResponseEntity<?> auth(Exception e,HttpServletRequest r){return build(HttpStatus.UNAUTHORIZED,"Invalid email or password",r);}
 @ExceptionHandler(Exception.class) public ResponseEntity<?> other(Exception e,HttpServletRequest r){return build(HttpStatus.INTERNAL_SERVER_ERROR,"Unexpected server error",r);}
 private ResponseEntity<?> build(HttpStatus s,String m,HttpServletRequest r){return ResponseEntity.status(s).body(Map.of("timestamp",Instant.now().toString(),"status",s.value(),"error",s.getReasonPhrase(),"message",m==null?"Request failed":m,"path",r.getRequestURI()));}
}
