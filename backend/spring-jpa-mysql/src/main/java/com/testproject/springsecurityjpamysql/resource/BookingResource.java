package com.testproject.springsecurityjpamysql.resource;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.service.BookingService;
import com.testproject.springsecurityjpamysql.service.SearchService;

@RequestMapping("/booking")
@CrossOrigin(origins = "*")
@RestController
public class BookingResource {

	@Autowired
	BookingService bookingService;
	
	@Autowired
	SearchService searchService;
	
	
	@PostMapping(value = "/new" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createNewBooking(@RequestBody Object bookingJSON) {
		
		Gson g = new Gson();
		Booking newBooking = g.fromJson(g.toJson(bookingJSON), Booking.class);
		bookingService.createBooking(newBooking);
		
	}
	
	@PutMapping(value = "/checkin" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkIn(@RequestBody Object bookingJSON) {
		
		Gson g = new Gson();
		String j = g.toJson(bookingJSON);
		Map map = g.fromJson(j, Map.class);		
		System.out.println(map);
		int propertyID = Integer.parseInt(map.get("propertyID").toString());
		String userID = bookingService.getUser(propertyID);
		Float payment = Float.parseFloat(map.get("payment").toString());		
		return searchService.checkIn(propertyID , payment , userID);
						
	}
	
}
