package com.example.demo.accept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AcceptService {

    @Autowired
    private AcceptRepo acceptRepository;

    // Method to save an accepted advertisement
    public AcceptEntity saveAcceptedAdvertisement(AcceptEntity acceptEntity) {
        return acceptRepository.save(acceptEntity);
    }

    // Method to get all accepted advertisements
    public List<AcceptEntity> getAllAcceptedAdvertisements() {
        return acceptRepository.findAll();
    }

    // Method to get a specific advertisement by ID
    public AcceptEntity getAcceptedAdvertisementById(Long id) {
        return acceptRepository.findById(id).orElse(null);
    }
    
}
