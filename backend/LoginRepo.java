package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepo extends JpaRepository<Loginentity, Long> {
    Loginentity findByEmail(String email);
}
