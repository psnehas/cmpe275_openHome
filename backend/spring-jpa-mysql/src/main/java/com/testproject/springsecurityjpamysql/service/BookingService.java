package com.testproject.springsecurityjpamysql.service;

import java.util.Date;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;

@Service
public class BookingService {
	
	@Autowired
	BookingRepository bookingRepo;
	
	@Autowired
	PostingsRepository postrepo;
	
	@Autowired
    JavaMailSender sender;
	
	public void createBooking(Booking newBooking){
		bookingRepo.save(newBooking);
		
		Property p = new Property();
		p.setPropertyID(newBooking.getPropertyID());
		Example<Property> propExample = Example.of(p);
		Property newProp = postrepo.findOne(propExample).get();
		newProp.setBooked(true);
		try {
			sendEmail(newBooking.getUserID() ,"New reservation", "A new booking has been created");
			sendEmail(newBooking.getOwnerID() ,"New reservation", "A new booking has been created");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		postrepo.save(newProp);
		
		
	}

	
	public String getUser(int propertyID) {
		Booking b = new Booking();
		b.setPropertyID(propertyID);
		Example<Booking> bookingExample = Example.of(b);
		Booking bookingObject = bookingRepo.findOne(bookingExample).get();
		return bookingObject.getUserID();
	}

	public void removeBooking(Integer propertyID, Date startDate, Date endDate, Float payment) throws Exception {
		
		Booking booking = new Booking();
		booking.setPropertyID(propertyID);
		booking.setStartDate(startDate);
		booking.setEndDate(endDate);	
		Example<Booking> bookingExample = Example.of(booking);
		Booking bookingObject = bookingRepo.findOne(bookingExample).get();
		
		//send email of payment						
		try {
			bookingRepo.delete(bookingObject);
//			sendEmail(bookingObject.getUserID(), "Booking has been cancelled", "Payment charged - $"+payment);
		}
		catch(Exception e) {
			throw e;
		}			
	}

	
	private void sendEmail(String email , String subject, String messageText) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
         
        helper.setTo(email);
        helper.setText(messageText);
        helper.setSubject(subject);
         
        sender.send(message);
    }

	public Booking getBookingObject(Integer propertyID, Date startDate) {

		System.out.println("find a booking for = "+propertyID+" start - "+startDate);
		Booking bTemp = new Booking();
		bTemp.setPropertyID(propertyID);
		bTemp.setStartDate(startDate);
		Example<Booking> bExample = Example.of(bTemp);
		return bookingRepo.findOne(bExample).get();

	}

	
	

}
