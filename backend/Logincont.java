package com.example.demo;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class Logincont {

    @Autowired
    private LoginService userService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Loginentity user) {
        Loginentity foundUser = userService.findByEmail(user.getEmail());
        if (foundUser != null && user.getPassword().equals(foundUser.getPassword())) {
            // Generate a token and return it along with user data
            return ResponseEntity.ok(foundUser); // Return user data on successful login
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Loginentity user) {
        if (userService.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).body("Email already exists");
        }
        Loginentity savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/current-user")
    public ResponseEntity<Loginentity> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername(); // Assuming email is used as username
            Loginentity user = userService.findByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            }
        }
        return ResponseEntity.status(401).body(null);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Loginentity>> getAllUsers() {
        List<Loginentity> users = userService.findAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Loginentity updatedUser) {
        Loginentity existingUser = userService.findById(id);
        if (existingUser != null) {
            existingUser.setFirstname(updatedUser.getFirstname());
            existingUser.setLastname(updatedUser.getLastname());
            existingUser.setUsername(updatedUser.getFirstname() + " " + updatedUser.getLastname());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPassword(updatedUser.getPassword());
            userService.saveUser(existingUser);
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
}
