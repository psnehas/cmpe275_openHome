package com.testproject.springsecurityjpamysql.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class Address {

	@Id 
	@GeneratedValue(strategy = GenerationType.AUTO)
	Integer addressID;	
	
	String street;
	String city;
	String state;
	Integer zip;
	
	public Address() {
		
	}

	
	
	@Override
	public String toString() {
		
		return street+" "+city+" "+state+" "+zip;
	}



	public Address(Integer addressID, String street, String city, String state, int zip) {
		
		this.addressID = addressID;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
	}


	public Integer getAddressID() {
		return addressID;
	}


	public void setAddressID(Integer addressID) {
		this.addressID = addressID;
	}


	public String getStreet() {
		return street;
	}


	public void setStreet(String street) {
		this.street = street;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public Integer getZip() {
		return zip;
	}


	public void setZip(Integer zip) {
		this.zip = zip;
	}
	
	
	
	
	
}
