package com.testproject.springsecurityjpamysql.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Availability {

	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer availabilityID;
	
	Boolean alwaysAvailable;
	Boolean mon;
	Boolean tue;
	Boolean wed;
	Boolean thurs;
	Boolean fri;
	Boolean sat;
	Boolean sun;
		
	public Integer getAvailabilityID() {
		return availabilityID;
	}
	public void setAvailabilityID(Integer availabilityID) {
		this.availabilityID = availabilityID;
	}
	public Boolean getAlwaysAvailable() {
		return alwaysAvailable;
	}
	public void setAlwaysAvailable(Boolean alwaysAvailable) {
		this.alwaysAvailable = alwaysAvailable;
	}
	public Boolean getMon() {
		return mon;
	}
	public void setMon(Boolean mon) {
		this.mon = mon;
	}
	public Boolean getTue() {
		return tue;
	}
	public void setTue(Boolean tue) {
		this.tue = tue;
	}
	public Boolean getWed() {
		return wed;
	}
	public void setWed(Boolean wed) {
		this.wed = wed;
	}
	public Boolean getThurs() {
		return thurs;
	}
	public void setThurs(Boolean thurs) {
		this.thurs = thurs;
	}
	public Boolean getFri() {
		return fri;
	}
	public void setFri(Boolean fri) {
		this.fri = fri;
	}
	public Boolean getSat() {
		return sat;
	}
	public void setSat(Boolean sat) {
		this.sat = sat;
	}
	public Boolean getSun() {
		return sun;
	}
	public void setSun(Boolean sun) {
		this.sun = sun;
	}
	
	public Availability() {	 }
	
	
		
}
