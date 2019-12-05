package com.testproject.springsecurityjpamysql.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
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
	
	@Autowired
	ClockResource myClock;


	
	@PostMapping(value = "/new" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public void createNewBooking(@RequestBody Object bookingJSON) {
		
		Gson g = new Gson();
		Booking newBooking = g.fromJson(g.toJson(bookingJSON), Booking.class);
		bookingService.createBooking(newBooking);
		
	}
	
	@SuppressWarnings("deprecation")
	@PutMapping(value = "/checkin" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkIn(@RequestBody Object bookingJSON) throws ParseException {
		
		//create JSON map
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(bookingJSON), Map.class);		
		System.out.println(map);
		
		//Get all info 
		Integer propertyID =  Integer.parseInt(map.get("propertyID").toString());	
		Date checkIn = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(map.get("checkInTime").toString());
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());
		Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("endDate").toString());
		
		//Get valid startDate
		Date validStart = 	new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());	
		validStart.setHours(15);
		
		//Valid endDate
		String incrementedDate = addOneDayCalendar(map.get("startDate").toString());
		Date validEnd = new SimpleDateFormat("yyyy-MM-dd").parse(incrementedDate);
		validEnd.setHours(3);
		
		/*
		 * checkInTime > 3 PM of startDate
		 * checkInTime < 3 AM of startDate + 1
		 */
		if(checkIn.before(validStart)) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cannot check in before 3 PM");
		}
		else if(checkIn.after(validEnd)) {
			 
			//Get booking object
							
			Booking bObj = bookingService.getBookingObject(propertyID,startDate);			
			Float charge = 0f;
			
			if(validStart.getDay() == 0 || validStart.getDay() == 6)			
				charge += bObj.getBookedrentWeekend()*0.3f;
			else 
				charge += bObj.getBookedrentWeekday()*0.3f;	
			
			System.out.println("late charge = "+charge);
			
			if(validEnd.before(endDate)) {		
				
				if(validEnd.getDay() == 0 || validEnd.getDay() == 6)			
					charge += bObj.getBookedrentWeekend()*0.3f;
				else 
					charge += bObj.getBookedrentWeekday()*0.3f;	
				
				System.out.println("additional charge = "+charge);
			}
			
			//cancel reservation
			try {				
				bookingService.removeBooking(propertyID, startDate, endDate, charge);
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Show - Booking has been cancelled. Charge "+charge);
			} catch (Exception e) {
				e.printStackTrace();
			}
						
		}	
		
		//Valid checkin
		
		Booking bObj = bookingService.getBookingObject(propertyID,startDate);
		Float payment = bObj.getBookedPrice();
		String userID = bObj.getUserID();
		searchService.checkIn(propertyID , payment , userID , checkIn);
		return ResponseEntity.ok().body(" Checked In successfully. Charge = "+payment);
				
	}
	
	public static String addOneDayCalendar(String date) 
			  throws ParseException {
			  
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Calendar c = Calendar.getInstance();
	    c.setTime(sdf.parse(date));
	    c.add(Calendar.DATE, 1);
	    return sdf.format(c.getTime());
	}
	
	@DeleteMapping(value = "user/cancel" , consumes = MediaType.APPLICATION_JSON_VALUE ) 
	public ResponseEntity<String> cancelBooking(@RequestBody Object propObject) {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(propObject), Map.class);	
		Integer propertyID = (Integer) map.get("propertyID");
		Date startDate = (Date) map.get("startDate");
		Date endDate = (Date) map.get("endDate");
		Float payment = (Float) map.get("payment");
		
		try {
			searchService.removeBooking(propertyID);		
			bookingService.removeBooking(propertyID,startDate,endDate,payment);
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Cancel booking failed");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body("Booking cancelled successfully");
		
	}
	

	
	
	
}
