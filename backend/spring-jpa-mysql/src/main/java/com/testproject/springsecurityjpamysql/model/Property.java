package com.testproject.springsecurityjpamysql.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
public class Property {
	
	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer propertyID;
	
	@OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
	@JoinColumn(name = "addressID")
	Address address;
	
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "userID")
	UserProfile user;
	
	@OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
	@JoinColumn(name = "parkingID")
	Parking parking;
	
	@OneToOne(fetch = FetchType.EAGER , cascade = CascadeType.ALL)
	@JoinColumn(name = "availabilityID")
	Availability availability;
		
	String propertyName;
	String sharingType;
	String description;
	String propertyType;
	Float area;
	Integer bedroomCount;
	String images;
	Boolean privateBathAvailable;
	Boolean privateShowerAvailable;
	Float rentWeekday;
	Float rentWeekend;
	
	ArrayList<Booking> bookings;
		
	Boolean booked;
	Boolean checkedIn;
	Boolean internetAvailable;

	Double currentRating; 
	Integer ratingCount;
	Double averageRating;
			
	
	public Double getAverageRating() {
		return averageRating;
	}


	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}


	public Double getCurrentRating() {
		return currentRating;
	}


	public void setCurrentRating(Double currentRating) {
		this.currentRating = currentRating;
	}


	public Integer getRatingCount() {
		return ratingCount;
	}


	public void setRatingCount(Integer ratingCount) {
		this.ratingCount = ratingCount;
	}


	
	public Property() { }
		
	
	public List<Booking> getBookings() {
		return bookings;
	}


	public void setBookings(ArrayList<Booking> bookings) {
		this.bookings = bookings;
	}


	public String getPropertyName() {
		return propertyName;
	}

	public void setPropertyName(String propertyName) {
		this.propertyName = propertyName;
	}
	
	
	public Address getAddress() {
		return address;
	}


	public void setAddress(Address address) {
		this.address = address;
	}


	public UserProfile getUser() {
		return user;
	}


	public void setUser(UserProfile user) {
		this.user = user;
	}


	public Parking getParking() {
		return parking;
	}


	public void setParking(Parking parking) {
		this.parking = parking;
	}


	public Boolean getInternetAvailable() {
		return internetAvailable;
	}


	public void setInternetAvailable(Boolean internetAvailable) {
		this.internetAvailable = internetAvailable;
	}


	public Availability getAvailability() {
		return availability;
	}


	public void setAvailability(Availability availability) {
		this.availability = availability;
	}

	
	public Integer getPropertyID() {
		return propertyID;
	}


	public void setPropertyID(Integer propertyID) {
		this.propertyID = propertyID;
	}


	public UserProfile getUserID() {
		return user;
	}


	public void setUserID(UserProfile user) {
		this.user = user;
	}


	public String getSharingType() {
		return sharingType;
	}


	public void setSharingType(String sharingType) {
		this.sharingType = sharingType;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public String getPropertyType() {
		return propertyType;
	}


	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}


	public Float getArea() {
		return area;
	}


	public void setArea(Float area) {
		this.area = area;
	}


	public Integer getBedroomCount() {
		return bedroomCount;
	}


	public void setBedroomCount(Integer bedroomCount) {
		this.bedroomCount = bedroomCount;
	}


	public String getImages() {
		return images;
	}


	public void setImages(String images) {
		this.images = images;
	}


	public Boolean getPrivateBathAvailable() {
		return privateBathAvailable;
	}


	public void setPrivateBathAvailable(Boolean privateBathAvailable) {
		this.privateBathAvailable = privateBathAvailable;
	}


	public Boolean getPrivateShowerAvailable() {
		return privateShowerAvailable;
	}


	public void setPrivateShowerAvailable(Boolean privateShowerAvailable) {
		this.privateShowerAvailable = privateShowerAvailable;
	}


	public Float getRentWeekday() {
		return rentWeekday;
	}


	public void setRentWeekday(Float rentWeekday) {
		this.rentWeekday = rentWeekday;
	}


	public Float getRentWeekend() {
		return rentWeekend;
	}


	public void setRentWeekend(Float rentWeekend) {
		this.rentWeekend = rentWeekend;
	}


	public Address getAddressID() {
		return address;
	}


	public void setAddressID(Address addressID) {
		this.address = addressID;
	}


	public Parking getParkingID() {
		return parking;
	}


	public void setParkingID(Parking parkingID) {
		this.parking = parkingID;
	}


	public Boolean getBooked() {
		return booked;
	}


	public void setBooked(Boolean booked) {
		this.booked = booked;
	}


	public Boolean getCheckedIn() {
		return checkedIn;
	}


	public void setCheckedIn(Boolean checkedIn) {
		this.checkedIn = checkedIn;
	}

	
	
}
