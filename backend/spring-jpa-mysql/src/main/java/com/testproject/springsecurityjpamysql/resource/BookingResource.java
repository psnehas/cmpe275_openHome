package com.testproject.springsecurityjpamysql.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Property;
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
	JavaMailSender sender;

	
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
		String incrementedDate = jumpDayCalendar(map.get("startDate").toString() , 1);
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
				
				sendEmail(bObj.getUserID(), "No Show", "Booking has been cancelled. Charge "+charge);
				
				return ResponseEntity.ok().body("No Show - Booking has been cancelled. Charge "+charge);
				
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
	
	public static String jumpDayCalendar(String date , int d) 
			  throws ParseException {
			  
	    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	    Calendar c = Calendar.getInstance();
	    c.setTime(sdf.parse(date));
	    c.add(Calendar.DATE, d);
	    return sdf.format(c.getTime());
	}
	
	
	@PutMapping(value = "/checkout" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> checkout(@RequestBody Object checkOutObject) throws Exception {
		//create JSON map
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(checkOutObject), Map.class);		
		System.out.println(map);
		
		Integer propertyID =  Integer.parseInt(map.get("propertyID").toString());	
		Date checkOut = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(map.get("checkOutTime").toString());
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());
		Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("endDate").toString());
		Booking bObj = bookingService.getBookingObject(propertyID,startDate);
		
		Date validCheckOutTime = endDate; 
		endDate.setHours(11);
		
		String tempDate = jumpDayCalendar(map.get("endDate").toString() , -1);
		Date earlyCheckOut = new SimpleDateFormat("yyyy-MM-dd").parse(tempDate);
		Float charge = 0f;
		
		if(checkOut.after(endDate)){
			bookingService.checkOut(propertyID, startDate, endDate, charge, checkOut);
			
			sendEmail(bObj.getUserID(), "Check Out", "You have already been checked out on "+endDate);
			
			return ResponseEntity.ok().body("You have already been checked out on "+endDate);
		}
		else if(checkOut.before(validCheckOutTime) && checkOut.after(earlyCheckOut)) {
			bookingService.checkOut(propertyID, startDate, endDate, charge, checkOut);	
			
			sendEmail(bObj.getUserID(), "Check Out", "You have been successfully checked out on");
			
			return ResponseEntity.ok().body("You have been checked out.");
			
		}
		else {
			System.out.println("Early check out");
			int daysRemaining = (int) ((endDate.getTime() - checkOut.getTime())/1000/60/60/24);
			
			charge += daysRemaining*bObj.getBookedrentWeekday()*0.15f;
			
			bookingService.checkOut(propertyID, startDate, endDate, charge, checkOut);
//			bookingService.removeBooking(propertyID, startDate, endDate, charge);
			
			sendEmail(bObj.getUserID(), "Early Check Out", "You have been checked out. Extra charges = $"+charge+" for "+daysRemaining+" days");
			
			return ResponseEntity.ok().body("You have been checked out. Extra charges = $"+charge+" for "+daysRemaining+" days");
						
		}

	}
	
	
	@DeleteMapping(value = "user/cancel" , consumes = MediaType.APPLICATION_JSON_VALUE ) 
	public ResponseEntity<String> cancelBooking(@RequestBody Object propObject) throws Exception {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(propObject), Map.class);	
		Integer propertyID = Integer.parseInt(map.get("propertyID").toString());
		Date cancelTime = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(map.get("cancelTime").toString());
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());
		Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("endDate").toString());

		Booking bObj = bookingService.getBookingObject(propertyID,startDate);
		
		String temp = jumpDayCalendar(map.get("startDate").toString() , -1);
		Date validCancelDate = new SimpleDateFormat("yyyy-MM-dd").parse(temp);
		validCancelDate.setHours(15);
		
		Date validStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());
		validStartDate.setHours(15);
				
		Float charge = 0f;
		if(cancelTime.before(validCancelDate)) {
			return ResponseEntity.ok().body("Your booking has been cancelled successfully"); 
		}		
		else if(cancelTime.after(validCancelDate)) {
								
			if(startDate.getDay() == 0 || startDate.getDay() == 6) {
				charge += bObj.getBookedrentWeekend()*0.3f;
			}
			else {
				charge += bObj.getBookedrentWeekday()*0.3f;
			}			
		}
		
		if(cancelTime.after(validStartDate)) {
			if(startDate.getDay() != 6) {
				charge += bObj.getBookedrentWeekday()*0.3f;
			}
			else {
				charge += bObj.getBookedrentWeekend()*0.3f;
			}				
		}
		
		bookingService.removeBooking(propertyID, startDate, endDate, charge);
		return ResponseEntity.ok().body("Final cancellation charges = "+charge); 	
				
	}	
	
	
	@DeleteMapping(value = "owner/cancel" , consumes = MediaType.APPLICATION_JSON_VALUE ) 
	public ResponseEntity<String> cancelBookingOwner(@RequestBody Object propObjectJSON) throws Exception {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(propObjectJSON), Map.class);	
		Integer propertyID = Integer.parseInt(map.get("propertyID").toString());
		Date cancelTime = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(map.get("cancelTime").toString());
		Date startDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());
		Date endDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("endDate").toString());
		Booking bookingObj = bookingService.getBookingObject(propertyID, startDate);
		String tempDate = jumpDayCalendar(map.get("startDate").toString() , -7);
		Date validCancelDate = new SimpleDateFormat("yyyy-MM-dd").parse(tempDate);
		Float penalty = 0f;
		
		Property propObject = searchService.getProperty(propertyID);
		
		Date validStartDate = new SimpleDateFormat("yyyy-MM-dd").parse(map.get("startDate").toString());		
		
		if(cancelTime.before(validCancelDate)) {						
			return ResponseEntity.ok().body("Booking has been cancelled. No penalty"); 
		}
		else if(cancelTime.after(validCancelDate) && cancelTime.before(startDate)) {
			
			Float parkingFee = 0f;
			
			if(propObject.getParking().isAvailable() && propObject.getParking().isPaid() ) 
				penalty += propObject.getParking().getDailyFee();
			
			
			if(startDate.getDay() == 0 && startDate.getDay() == 6) 
				penalty += bookingObj.getBookedrentWeekend() * 0.15f;
			
			else 
				penalty += bookingObj.getBookedrentWeekday() * 0.15f;	
			
		}
		else if(cancelTime.after(startDate)) {
			int daysRemaining = (int) ((endDate.getTime() - cancelTime.getTime())/1000/60/60/24);
			System.out.println("Days remaining - "+daysRemaining);
			//check if cancelTime is before or after 3 PM
			System.out.println("Cancel time - "+cancelTime.getHours());
			if(cancelTime.getHours() < 15 ) {
				
				penalty += daysRemaining*bookingObj.getBookedrentWeekday()*0.15f;
				System.out.println("Cancel time is before 3 PM. Penalty  - "+penalty);
			}
			else if(cancelTime.getHours() >= 15) {
				if(daysRemaining > 2) 
					penalty += (daysRemaining-1)*bookingObj.getBookedrentWeekday()*0.15f;
				else 
					penalty += bookingObj.getBookedrentWeekday()*0.15f;
				
				System.out.println("Cancel time is after 3 PM. Penalty  - "+penalty);
			}
			
		}
			
		return ResponseEntity.ok().body("Booking has been cancelled. Penalty = "+penalty);
			
	}
	
	
	
	
	private void sendEmail(String email , String subject, String messageText) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setTo(email);
        helper.setText(messageText);
        helper.setSubject(subject);
         
        sender.send(message);
    }
	
	
	
	
	
	
	
	
}
