package com.testproject.springsecurityjpamysql.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class UserProfile {

	@Id
	String userID;
	
	String firstName;
	String lastName;
	String phoneNumber;
	String role;
	
	
	public UserProfile() {	 }

	public UserProfile(String userID, String firstName, String lastName, String phoneNumber, String role) {
		this.userID = userID;
		this.firstName = firstName;
		this.lastName = lastName;
		this.phoneNumber = phoneNumber;
		this.role = role;
	}

	public String getUserID() {
		return userID;
	}

	public void setUserID(String userID) {
		this.userID = userID;
	}
	
	
	
	
			
}
