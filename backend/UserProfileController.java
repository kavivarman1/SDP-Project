//package com.example.demo;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/api/auth")
//public class UserProfileController {
//
//    @Autowired
//    private LoginService userService;
//
//    @GetMapping("/user")
//    public ResponseEntity<?> getUserProfile() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        if (authentication == null || !(authentication.getPrincipal() instanceof Loginentity)) {
//            return ResponseEntity.status(401).body("Unauthorized");
//        }
//        Loginentity user = (Loginentity) authentication.getPrincipal();
//        return ResponseEntity.ok(user);
//    }
//}
