package com.testproject.springsecurityjpamysql.model;

public class Address {

	int addressID;
	String street;
	String city;
	String state;
	int zip;
	
	public Address() {
		
	}

	public Address(int addressID, String street, String city, String state, int zip) {
		
		this.addressID = addressID;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
	}
	
	
	
}
