package com.example.demo.avertise;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TurfService {

    @Autowired
    private TurfRepo repository;

    public List<Turfentity> getAllAdvertisements() {
        return repository.findAll();
    }

    public Turfentity saveAdvertisement(Turfentity advertisement) {
        return repository.save(advertisement);
    }

    public Optional<Turfentity> getAdvertisement(Long id) {
        return repository.findById(id);
    }

    public Optional<Turfentity> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    public void deleteAdvertisement(Long id) {
        repository.deleteById(id);
    }
}
