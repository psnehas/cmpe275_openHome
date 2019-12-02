package com.testproject.springsecurityjpamysql.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
	
	
	@GetMapping("/owner/{ownerid}")
	public List<Property> getOwnerDashboard(@PathVariable String ownerid) {
		
		Property p = new Property();
		UserProfile owner = new UserProfile();
		owner.setUserID(ownerid);
		p.setUser(owner);
		Example<Property> propExample = Example.of(p);				
		return postRepo.findAll(propExample);
		
	}
	
	@GetMapping("/user/{userID}")
	public List<Booking> getUserDashboard(@PathVariable String userID) {
		
		Booking b = new Booking();
		b.setUserID(userID);
		Example<Booking> bookings = Example.of(b);				
		return bookingRepo.findAll(bookings);
		
	}

}
