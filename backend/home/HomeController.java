package com.example.demo.home;

import com.example.demo.home.HomeEntity;
import com.example.demo.home.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "http://localhost:3000")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping("/home")
    public ResponseEntity<List<HomeEntity>> getAllHomes() {
        List<HomeEntity> homes = homeService.getAllHomes();
        return ResponseEntity.ok(homes);
    }
}
