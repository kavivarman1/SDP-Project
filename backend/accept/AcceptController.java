package com.example.demo.accept;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/accept")
public class AcceptController {

    @Autowired
    private AcceptService acceptService;

  
    @PostMapping("/accept/{id}")
    public AcceptEntity acceptAdvertisement(@PathVariable Long id, @RequestBody AcceptEntity acceptEntity) {
        return acceptService.saveAcceptedAdvertisement(acceptEntity);
    }


    @GetMapping("/all")
    public List<AcceptEntity> getAllAcceptedAdvertisements() {
        return acceptService.getAllAcceptedAdvertisements();
    }


    @GetMapping("/{id}")
    public AcceptEntity getAcceptedAdvertisementById(@PathVariable Long id) {
        return acceptService.getAcceptedAdvertisementById(id);
    }
    

    @PutMapping("/{id}")
    public AcceptEntity updateAdvertisement(@PathVariable Long id, @RequestBody AcceptEntity acceptEntity) {
        AcceptEntity existingAd = acceptService.getAcceptedAdvertisementById(id);
        if (existingAd != null) {
            // Update fields
            existingAd.setTurfName(acceptEntity.getTurfName());
            existingAd.setOwnerName(acceptEntity.getOwnerName());
            existingAd.setLocation(acceptEntity.getLocation());
            existingAd.setContactNumber(acceptEntity.getContactNumber());
            existingAd.setWhatsappNumber(acceptEntity.getWhatsappNumber());
            existingAd.setEmail(acceptEntity.getEmail());
            existingAd.setPerHour(acceptEntity.getPerHour());
            existingAd.setAvailableSports(acceptEntity.getAvailableSports());
            existingAd.setImage(acceptEntity.getImage()); // Update image if needed
            return acceptService.saveAcceptedAdvertisement(existingAd);
        }
        return null;
    }

}
