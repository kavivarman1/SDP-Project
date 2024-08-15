package com.example.demo.avertise;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/advertisements")
public class Turfcont {

    @Autowired
    private TurfService turfService;

    @GetMapping("/all")
    public List<Turfentity> getAllAdvertisements() {
        return turfService.getAllAdvertisements();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Turfentity> getAdvertisementById(@PathVariable Long id) {
        Optional<Turfentity> turfentity = turfService.getAdvertisement(id);
        return turfentity.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @PostMapping("/advertise")
    public ResponseEntity<String> addAdvertisement(
            @RequestParam("turfName") String turfName,
            @RequestParam("ownerName") String ownerName,
            @RequestParam("location") String location,
            @RequestParam("totalSqFeet") Integer totalSqFeet,
            @RequestParam("contactNumber") String contactNumber,
            @RequestParam("whatsappNumber") String whatsappNumber,
            @RequestParam("email") String email,
            @RequestParam("perHour") Double perHour,
            @RequestParam("password") String password,
            @RequestParam("availableSports") String availableSports,
            @RequestParam(value = "image", required = false) MultipartFile image) {

        Turfentity turfentity = new Turfentity();
        turfentity.setTurfName(turfName);
        turfentity.setOwnerName(ownerName);
        turfentity.setLocation(location);
        turfentity.setTotalSqFeet(totalSqFeet);
        turfentity.setContactNumber(contactNumber);
        turfentity.setWhatsappNumber(whatsappNumber);
        turfentity.setEmail(email);
        turfentity.setPerHour(perHour);
        turfentity.setPassword(password);
        turfentity.setAvailableSports(availableSports);

        if (image != null && !image.isEmpty()) {
            try {
                turfentity.setImage(image.getBytes());
            } catch (IOException e) {
                return new ResponseEntity<>("Failed to process image", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        turfService.saveAdvertisement(turfentity);

        return new ResponseEntity<>("Advertisement submitted successfully!", HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAdvertisement(@PathVariable Long id) {
        Optional<Turfentity> turfentity = turfService.getAdvertisement(id);
        if (turfentity.isPresent()) {
            turfService.deleteAdvertisement(id);
            return new ResponseEntity<>("Advertisement deleted successfully!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Advertisement not found", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Optional<Turfentity> turfentity = turfService.getAdvertisement(id);
        if (turfentity.isPresent() && turfentity.get().getImage() != null) {
            return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_TYPE, "image/jpeg") // Adjust MIME type as needed
                .body(turfentity.get().getImage());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
