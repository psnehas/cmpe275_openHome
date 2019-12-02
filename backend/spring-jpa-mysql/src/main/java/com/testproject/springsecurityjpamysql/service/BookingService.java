package com.testproject.springsecurityjpamysql.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;

@Service
public class BookingService {
	
	@Autowired
	BookingRepository bookingrepo;
	
	@Autowired
	PostingsRepository postrepo;
	
	public void createBooking(Booking newBooking) {
		bookingrepo.save(newBooking);
		
		Property p = new Property();
		p.setPropertyID(newBooking.getPropertyID());
		Example<Property> propExample = Example.of(p);
		Property newProp = postrepo.findOne(propExample).get();
		newProp.setBooked(true);
		postrepo.save(newProp);
		
	}

	public String getUser(int propertyID) {
		Booking b = new Booking();
		b.setPropertyID(propertyID);
		Example<Booking> bookingExample = Example.of(b);
		Booking bookingObject = bookingrepo.findOne(bookingExample).get();
		return bookingObject.getUserID();
	}
	
	

}
