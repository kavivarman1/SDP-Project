package com.example.demo.avertise;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "advertisements")
public class Turfentity implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "turf_name")
    private String turfName;

    @Column(name = "owner_name")
    private String ownerName;

    @Column(name = "location")
    private String location;

    @Column(name = "total_sq_feet")
    private Integer totalSqFeet;

    @Column(name = "contact_number")
    private String contactNumber;

    @Column(name = "whatsapp_number")
    private String whatsappNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "per_hour")
    private Double perHour;

    @Column(name = "available_sports")
    private String availableSports;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

    @Column(name = "password")
    private String password;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTurfName() {
		return turfName;
	}

	public void setTurfName(String turfName) {
		this.turfName = turfName;
	}

	public String getOwnerName() {
		return ownerName;
	}

	public void setOwnerName(String ownerName) {
		this.ownerName = ownerName;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Integer getTotalSqFeet() {
		return totalSqFeet;
	}

	public void setTotalSqFeet(Integer totalSqFeet) {
		this.totalSqFeet = totalSqFeet;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getWhatsappNumber() {
		return whatsappNumber;
	}

	public void setWhatsappNumber(String whatsappNumber) {
		this.whatsappNumber = whatsappNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Double getPerHour() {
		return perHour;
	}

	public void setPerHour(Double perHour) {
		this.perHour = perHour;
	}

	public String getAvailableSports() {
		return availableSports;
	}

	public void setAvailableSports(String availableSports) {
		this.availableSports = availableSports;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setStatus(String string) {
		// TODO Auto-generated method stub
		
	}

    // Getters and setters
    // ...
}
