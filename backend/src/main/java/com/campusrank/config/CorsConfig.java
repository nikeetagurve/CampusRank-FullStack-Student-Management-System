package com.campusrank.config;
import org.springframework.context.annotation.*;
import org.springframework.web.servlet.config.annotation.*;
@Configuration
public class CorsConfig implements WebMvcConfigurer {
 public void addCorsMappings(CorsRegistry r){r.addMapping("/api/**").allowedOriginPatterns("*").allowedMethods("GET","POST","PUT","PATCH","DELETE","OPTIONS").allowedHeaders("*");}
}
