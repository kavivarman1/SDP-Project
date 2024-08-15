package com.example.demo.accept;

import jakarta.persistence.*;

@Entity
@Table(name = "AcceptedAdvertisements")
public class AcceptEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "turfName")
    private String turfName;

    @Column(name = "ownerName")
    private String ownerName;

    @Column(name = "location")
    private String location;

    @Column(name = "contactNumber")
    private String contactNumber;

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

	@Column(name = "whatsappNumber")
    private String whatsappNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "perHour")
    private Double perHour;

    @Column(name = "availableSports")
    private String availableSports;

    @Lob
    @Column(name = "image", columnDefinition = "LONGBLOB")
    private byte[] image;

}
