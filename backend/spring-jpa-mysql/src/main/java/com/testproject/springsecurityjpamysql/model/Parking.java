package com.testproject.springsecurityjpamysql.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Parking {

	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer parkingID;
	
	boolean available;
	boolean paid;
	Float dailyFee;
	
	
	public Parking() {	 
		
	}

	public Integer getParkingID() {
		return parkingID;
	}

	public void setParkingID(Integer parkingID) {
		this.parkingID = parkingID;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public Float getDailyFee() {
		return dailyFee;
	}

	public void setDailyFee(Float dailyFee) {
		this.dailyFee = dailyFee;
	}
	
	
		
}
