package com.campusrank.controller;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
@RestController @RequestMapping("/api/v1")
public class HealthController { @GetMapping("/health") public Map<String,String> health(){return Map.of("status","UP","service","CampusRank API");} }
