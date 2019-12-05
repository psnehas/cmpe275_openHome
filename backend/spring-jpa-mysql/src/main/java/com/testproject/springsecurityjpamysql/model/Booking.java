package com.testproject.springsecurityjpamysql.model;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Booking {

	
	Integer propertyID;		
	
	Date startDate;	
	Date endDate;
	String ownerID;
	String userID;
	Float bookedrentWeekday;
	Float bookedrentWeekend;
	Date checkInTime;
	
	@Id
	Float bookedPrice;
	Float payment;
	
	public Booking() { 	}

	
		
	public Float getBookedrentWeekday() {
		return bookedrentWeekday;
	}




	public void setBookedrentWeekday(Float bookedrentWeekday) {
		this.bookedrentWeekday = bookedrentWeekday;
	}




	public Float getBookedrentWeekend() {
		return bookedrentWeekend;
	}




	public void setBookedrentWeekend(Float bookedrentWeekend) {
		this.bookedrentWeekend = bookedrentWeekend;
	}




	public Date getCheckInTime() {
		return checkInTime;
	}

	
	public void setCheckInTime(Date checkInTime) {
		this.checkInTime = checkInTime;
	}


	public Float getPayment() {
		return payment;
	}


	public void setPayment(Float payment) {
		this.payment = payment;
	}


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

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}

	public Float getBookedPrice() {
		return bookedPrice;
	}

	public void setBookedPrice(Float bookedPrice) {
		this.bookedPrice = bookedPrice;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	

}
