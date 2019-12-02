package com.testproject.springsecurityjpamysql.model;

import java.time.LocalDate;
import java.util.Date;

public class Filter {

	String city;
	Integer zip;
	Date startDate;
	Date endDate;
	String sharingType;
	String propertyType;
	Float priceLow;
	Float priceHigh;
	String text;
	Boolean internetAvailable;
	
	
	public Filter() {	 }


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public Integer getZip() {
		return zip;
	}


	public void setZip(Integer zip) {
		this.zip = zip;
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


	public String getSharingType() {
		return sharingType;
	}


	public void setSharingType(String sharingType) {
		this.sharingType = sharingType;
	}


	public String getPropertyType() {
		return propertyType;
	}


	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}


	public Float getPriceLow() {
		return priceLow;
	}


	public void setPriceLow(Float priceLow) {
		this.priceLow = priceLow;
	}


	public Float getPriceHigh() {
		return priceHigh;
	}


	public void setPriceHigh(Float priceHigh) {
		this.priceHigh = priceHigh;
	}


	public String getText() {
		return text;
	}


	public void setText(String text) {
		this.text = text;
	}


	public Boolean getInternetAvailable() {
		return internetAvailable;
	}


	public void setInternetAvailable(Boolean internetAvailable) {
		this.internetAvailable = internetAvailable;
	}
	
	
			
}
