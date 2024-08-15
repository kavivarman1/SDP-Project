package com.example.demo.avertise;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TurfRepo extends JpaRepository<Turfentity, Long> {
    Optional<Turfentity> findByEmail(String email);
}
