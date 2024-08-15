package com.example.demo.accept;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AcceptRepo extends JpaRepository<AcceptEntity, Long> {
}
