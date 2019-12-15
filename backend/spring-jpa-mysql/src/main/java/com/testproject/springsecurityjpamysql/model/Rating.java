package com.testproject.springsecurityjpamysql.model;

public class Rating {
	
	int propertyID;
	Double currentRating; 
	Integer ratingCount;
	Double averageRating;
	
	public int getPropertyID() {
		return propertyID;
	}
	public void setPropertyID(int propertyID) {
		this.propertyID = propertyID;
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
	public Double getAverageRating() {
		return averageRating;
	}
	public void setAverageRating(Double averageRating) {
		this.averageRating = averageRating;
	}
	
	public Rating(int propertyID, Double currentRating, Integer ratingCount, Double averageRating) {
		super();
		this.propertyID = propertyID;
		this.currentRating = currentRating;
		this.ratingCount = ratingCount;
		this.averageRating = averageRating;
	}
	
	public Rating() {
		
	}
	
	

	
}
