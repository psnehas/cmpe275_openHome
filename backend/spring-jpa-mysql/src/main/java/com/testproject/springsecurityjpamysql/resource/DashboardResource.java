package com.testproject.springsecurityjpamysql.resource;

import java.util.ArrayList;
import java.util.List;

import javax.swing.ListModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;

@RequestMapping("/dashboard")
@CrossOrigin(origins = "*")
@RestController
public class DashboardResource {
	
	@Autowired
	PostingsRepository postRepo;
	
	@Autowired
	BookingRepository bookingRepo;
	
	
	@GetMapping("/owner/{ownerID}")
	public String getOwnerDashboard(@PathVariable String ownerID) {
		
//		Booking b = new Booking();
//		b.setOwnerID(ownerID);
//		Example<Booking> bookings = Example.of(b);				
//		List<Booking> bList = bookingRepo.findAll(bookings);
		
		Property p = new Property();
		UserProfile owner = new UserProfile();
		owner.setUserID(ownerID);
		p.setUser(owner);
		p.setBooked(true);
		Example<Property> propExample = Example.of(p);				
		List<Property> pList = postRepo.findAll(propExample);
		
		String res = "";
		
		for(Property temp : pList) {
			
			Booking b = new Booking();
			b.setPropertyID(temp.getPropertyID());
			Example<Booking> bookings = Example.of(b);
			ArrayList<Booking> bookedList = (ArrayList<Booking>) bookingRepo.findAll(bookings);
			
			temp.setBookings(bookedList);
			
			Gson g = new Gson();
			JsonElement jsonElement = g.toJsonTree(temp);
					
			res += g.toJson(jsonElement);
					
		}
		
		return res;
		
	}
	
	@GetMapping("/user/{userID}")
	public ArrayList<Property> getUserDashboard(@PathVariable String userID) {
		
		ArrayList<Property> result = new ArrayList<Property>();
		
		Booking b = new Booking();
		b.setUserID(userID);
		Example<Booking> bookings = Example.of(b);				
		List<Booking> bList = bookingRepo.findAll(bookings);
		
		System.out.println("Booking list size = "+bList.size());
		
		for(Booking booking : bList) {
			
			int propertyID = booking.getPropertyID();
			System.out.println("Property id - "+propertyID);
			Property p = new Property(); 
			p.setPropertyID(propertyID);
			Example<Property> propExample = Example.of(p);
			Property pObject = postRepo.findOne(propExample).get();
			System.out.println("Property found = "+pObject.getPropertyName());
			
			ArrayList<Booking> addBooking = new ArrayList<Booking>();
			addBooking.add(booking);
			pObject.setBookings(addBooking);
			result.add(pObject);
						
		}
		
		return result;
		
		
	}

}
