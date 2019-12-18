package com.testproject.springsecurityjpamysql.service;

import java.lang.reflect.Field;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.testproject.springsecurityjpamysql.model.Address;
import com.testproject.springsecurityjpamysql.model.Availability;
import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Filter;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.model.Rating;
import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;
import com.testproject.springsecurityjpamysql.repository.UserRepository;

@Service
public class SearchService {
	
	@Autowired
	PostingsRepository postRepo;
	
	@Autowired
	UserRepository userRepo;
		
	@Autowired
    JavaMailSender sender;
	
	@Autowired
	BookingRepository bookingRepo;
	
	public List<Property> getPostings(Filter filter) throws IllegalArgumentException, IllegalAccessException {
		
		Property p = new Property();
		String text = null;
		Date startDate = null;
		Date endDate = null;
		Float priceLow = null , priceHigh = null;
		
		for(Field f : filter.getClass().getDeclaredFields()) {
			Address a = null;
			f.setAccessible(true);
			if(f.get(filter) != null) {
				String filterName = f.getName();				
				switch(filterName) {
					case "city" : 
						if(a == null)
							a = new Address();						
						a.setCity(f.get(filter).toString());
						p.setAddress(a);
						break;
						
					case "zip" : 
						if(a == null)
							a = new Address();
						a.setZip(Integer.parseInt(f.get(filter).toString()));
						p.setAddress(a);
						break;
						
					case "internetAvailable" : 
						p.setInternetAvailable(Boolean.parseBoolean(f.get(filter).toString()));
						break;
						
					case "sharingType" :
						p.setSharingType(f.get(filter).toString());
						break;
						
					case "propertyType" : 
						p.setPropertyType(f.get(filter).toString());
						break;
						
					case "priceLow" :
						priceLow = Float.parseFloat(f.get(filter).toString());
						break;
						
					case "priceHigh":
						priceHigh = Float.parseFloat(f.get(filter).toString());
						break;
						
					case "text" : 
						text = f.get(filter).toString();
						break;
						
					case "startDate" : 
						startDate = (Date) f.get(filter);
						break;	
						
					case "endDate" :
						endDate =  (Date) f.get(filter);
						break;	
					}				
			}				
		}
		
//		p.setBooked(false);
		Example<Property> propExample = Example.of(p);				
		List<Property> list =  postRepo.findAll(propExample);
		
		if(text!=null || priceHigh!=null || startDate!=null)
			return filterForFlags(list, text , priceLow , priceHigh , startDate , endDate);
		else 
			return list;
		
	}


	public List<Property> filterForFlags(List<Property> list, String text , Float priceLow , Float priceHigh, Date startDate, Date endDate) {
	
		if(list == null) {
			Property p = new Property();
//			p.setBooked(false);
			Example<Property> propExample = Example.of(p);		
			list =  postRepo.findAll(propExample);
		}
			
		
		for(Property p : new ArrayList<Property>(list)) {
			
			if(text!=null && 
				!p.getDescription().toLowerCase().contains(text.toLowerCase()) && 
				!p.getPropertyName().toLowerCase().contains(text.toLowerCase()) && 
				!p.getAddress().getStreet().toLowerCase().contains(text.toLowerCase())) {
				
				list.remove(p);
				continue;
			}
			
			if(priceHigh!=null &&
				( !(p.getRentWeekday() >= priceLow) ||
				!(p.getRentWeekday() <= priceHigh) ) ) {
				
				
				list.remove(p);
				continue;
			}	
			
			if(startDate != null) {
				
				System.out.println("Handling Dates");
				
				//check if property is booked for those dates
				Booking b = new Booking();
				b.setPropertyID(p.getPropertyID());
				Example<Booking> bex = Example.of(b);
				if(bookingRepo.findAll(bex) != null ) {
					
					List<Booking> bTempList = bookingRepo.findAll(bex);
					for(Booking bTemp : bTempList)  {
											
						if( !(( bTemp.getStartDate().before(startDate) && 
									bTemp.getEndDate().before(startDate) ) || 
								( bTemp.getStartDate().after(endDate) && 
										bTemp.getEndDate().after(endDate) ) )
								) 
						{						
								list.remove(p);
							continue;
						}
					}
					
				}
				
				Availability av = p.getAvailability();
				System.out.println("Availability - "+av.getAlwaysAvailable());
				if(av.getAlwaysAvailable())
					continue;
				
				SimpleDateFormat ymdFormat = new SimpleDateFormat("yyyy-MM-dd");
				String startString = ymdFormat.format(startDate);
				String endDateString = ymdFormat.format(endDate);
				LocalDate start = LocalDate.parse(startString);
				LocalDate end = LocalDate.parse(endDateString);	

				
				outer:while(!start.equals(end)) {
					String day = start.getDayOfWeek().toString();
					System.out.println(day);
					switch(day) {
					case "MONDAY" : 
						if(!av.getMon()) {
							list.remove(p);
							break outer;
						}
						break;
														
					case "TUESDAY" : 
						if(!av.getTue()) {
							list.remove(p);
							break outer;
						}
						break;
						
					case "WEDNESDAY" : 
						if(!av.getWed()) {
							list.remove(p);
							break outer;
						}
						break;
						
					case "THURSDAY" : 
						if(!av.getThurs()) 
						{
							list.remove(p);
							break outer;
						}
						break;
						
					case "FRIDAY" : 
						if(!av.getFri()) {
							list.remove(p);
							break outer;
						}
						break;
						
					case "SATURDAY" : 
						if(!av.getSat())
						{
							list.remove(p);
							break outer;
						}
						break;
						
					case "SUNDAY" : 
						if(!av.getSun()) 
						{
							list.remove(p);
							break outer;
						}
						break;
						
						default : break;
						
					}
					
					start = start.plusDays(1);
															
				}
			}
		}
						
		return list;
		
}


	public void addPosting(Property p) {	
	
		postRepo.save(p);	
		try {
			sendEmail(p.getUser().getUserID(), "OpenHome : New Posting",
					"You new place at "+p.getAddress().toString()+" has been posted on OpenHome");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public Property getProperty(Integer propertyID) {
		
		Property p = new Property(); 
		p.setPropertyID(propertyID);
		Example<Property> pExample = Example.of(p);
		return postRepo.findOne(pExample).get();
		
	}


	public List<Property> findAllProps() {
		return postRepo.findAll();
	}


	@Transactional(rollbackFor=Exception.class)
	public ResponseEntity<String> checkIn(Integer propertyID, Float payment, String userID, Date checkIn) {
				
		try {
		//Get card number from UserProfile
		UserProfile user = new UserProfile();
		user.setUserID(userID);
		Example<UserProfile> userExample = Example.of(user);
		UserProfile userObject = userRepo.findOne(userExample).get();
		
		//Check card validity
		String cardNumber = userObject.getCardNumber();
		if(cardNumber.length() != 16) 
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Card Number. Length is = "+cardNumber.length());
		
		for(int i = 0 ; i < cardNumber.length() ; i++) {
			char current = cardNumber.charAt(i);
			if( Character.isDigit(current) || Character.isWhitespace(current) ) 
				continue;
			else
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Character - "+current+" at position = "+i);
		}
		
		//Set payment in booking table
		Booking booking = new Booking();
		booking.setPropertyID(propertyID);
		Example<Booking> bookingExample = Example.of(booking);
		Booking bookingObject = bookingRepo.findOne(bookingExample).get();
		bookingObject.setPayment(payment);
		
		System.out.println("offset ="+checkIn.getTimezoneOffset());
		
		long offset = checkIn.getTimezoneOffset()*60*1000;
		
		checkIn.setTime(checkIn.getTime()-offset);
				
		bookingObject.setCheckInTime(checkIn);
		bookingRepo.save(bookingObject);
		
		//Set checkedIn = true in property table
		Property p = new Property();
		p.setPropertyID(propertyID);
		Example<Property> propExample = Example.of(p);
		Property prop = postRepo.findOne(propExample).get();
		prop.setCheckedIn(true);
		postRepo.save(prop);
		
		//Get Booking details
//		Booking b = new Booking();
//		b.setPropertyID(propertyID);
//		Example<Booking> booking = Example.of(b);
//		Booking bookingObject = bookingRepo.findOne(booking).get();
		
		//Send notification 
		String msgBody = "Hello "+userObject.getFirstName()+" "+userObject.getLastName()+""
				+"\nYou have successfully checked in."
				+"\nA transaction of $"+payment+" has been charged on your card"
				+"\nBooking details:"
				+"\nProperty name: "+prop.getPropertyName()
				+"\nAddress : "+prop.getAddress().getStreet()+" "+prop.getAddress().getCity()+" "+prop.getAddress().getZip()
				+"\nBooked until : "+bookingObject.getEndDate()+""
				+"\n\nThanks and regards,\nOpenHome";
//		try {
			sendEmail(bookingObject.getUserID() , "OpenHome charges" , msgBody );
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return ResponseEntity.status(HttpStatus.OK).body("Payment initialized");		
	}
	
	
	  private void sendEmail(String email , String subject, String messageText) throws Exception{
	        MimeMessage message = sender.createMimeMessage();
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	         
	        helper.setTo(email);
	        helper.setText(messageText);
	        helper.setSubject(subject);
	         
	        sender.send(message);
	    }


	public void removeBooking(Integer propertyID) {
		
		Property pTemp = new Property(); 
		pTemp.setPropertyID(propertyID);
		
			
	}


	public ResponseEntity<Object> addRating(Integer propertyID , Double rating) {
		
		Property p = new Property();
		p.setPropertyID(propertyID);
		Example<Property> propExample = Example.of(p);
		Property prop = postRepo.findOne(propExample).get();
		
		Double currentRating = 0d;
		Double averageRating = null;
		int ratingCount = 0;
		
		if(prop.getCurrentRating() == null ) {
			currentRating = rating;
			averageRating = (double) rating;
			ratingCount = 1;
		}
		else {
			currentRating = prop.getCurrentRating();
			currentRating += rating;
			ratingCount = prop.getRatingCount();
			ratingCount++;
			averageRating = (double) (currentRating/ratingCount);			
		}
		
		prop.setRatingCount(ratingCount);
		prop.setCurrentRating(currentRating);
		prop.setAverageRating(averageRating);
		
		try {			
			postRepo.save(prop);
			return ResponseEntity.ok().body(new Rating(propertyID, currentRating, ratingCount, averageRating));
			
		}
		catch(Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Rating failed");
		}
						
	}
	
	
	

}
