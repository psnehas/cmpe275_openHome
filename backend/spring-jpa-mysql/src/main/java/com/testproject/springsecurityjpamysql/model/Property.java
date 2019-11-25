package com.testproject.springsecurityjpamysql.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Property {
	
	@Id
	Integer propertyID;
	
	String ownerID;
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
	Integer addressID;
	Integer parkingID;
	Boolean booked;
	Boolean checkedIn;
	
	
	public Integer getPropertyID() {
		return propertyID;
	}


	public void setPropertyID(Integer propertyID) {
		this.propertyID = propertyID;
	}


	public String getOwnerID() {
		return ownerID;
	}


	public void setOwnerID(String ownerID) {
		this.ownerID = ownerID;
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


	public Integer getAddressID() {
		return addressID;
	}


	public void setAddressID(Integer addressID) {
		this.addressID = addressID;
	}


	public Integer getParkingID() {
		return parkingID;
	}


	public void setParkingID(Integer parkingID) {
		this.parkingID = parkingID;
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


	
	
	public Property() { }
	
}
