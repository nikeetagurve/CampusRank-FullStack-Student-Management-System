package com.campusrank.security;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
@Component
public class JwtAuthFilter extends OncePerRequestFilter {
 private final JwtService jwt; private final CustomUserDetailsService users;
 public JwtAuthFilter(JwtService jwt,CustomUserDetailsService users){this.jwt=jwt;this.users=users;}
 protected void doFilterInternal(HttpServletRequest req,HttpServletResponse res,FilterChain chain)throws ServletException,IOException{
  String header=req.getHeader("Authorization");
  if(header!=null&&header.startsWith("Bearer ")&&SecurityContextHolder.getContext().getAuthentication()==null){
   String token=header.substring(7);
   if(jwt.isValid(token)){String email=jwt.extractEmail(token);UserDetails details=users.loadUserByUsername(email);
    var auth=new UsernamePasswordAuthenticationToken(details,null,details.getAuthorities());
    auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(req));SecurityContextHolder.getContext().setAuthentication(auth);}
  }
  chain.doFilter(req,res);
 }
}
