package com.testproject.springsecurityjpamysql.service;

import java.util.Date;
import java.util.List;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.Booking;
import com.testproject.springsecurityjpamysql.model.MyClock;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.repository.BookingRepository;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;
import com.testproject.springsecurityjpamysql.resource.ClockResource;

@Service
public class BookingService {
	
	@Autowired
	BookingRepository bookingRepo;
	
	@Autowired
	PostingsRepository postrepo;
	
	@Autowired
    JavaMailSender sender;
	
	@Autowired
	MyClock myClock;
	
	public void createBooking(Booking newBooking) {
		bookingRepo.save(newBooking);
		
		Property p = new Property();
		p.setPropertyID(newBooking.getPropertyID());
		Example<Property> propExample = Example.of(p);
		Property newProp = postrepo.findOne(propExample).get();
		newProp.setBooked(true);
		postrepo.save(newProp);
		
		try {
			sendEmail(newBooking.getUserID(), "OpenHome : New Booking", "\nOpenHome booking details - "+
			"\nProperty details - "+newProp.getAddress().toString() +
			newBooking.toString()+" \n\n Enjoy your stay. \nOpenHome team");
			
			sendEmail(newBooking.getOwnerID(), "OpenHome : New Booking", "\nOpenHome booking details - "+
					"\nProperty details - "+newProp.getAddress().toString() +
					newBooking.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
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
			}
		catch(Exception e) {
			throw e;
		}			
	}
	
	
	public void checkOut(Integer propertyID, Date startDate, Date endDate, Float payment,Date checkOutTime) throws Exception {
		
		Booking booking = new Booking();
		booking.setPropertyID(propertyID);
//		booking.setStartDate(startDate);
//		booking.setEndDate(endDate);	
		Example<Booking> bookingExample = Example.of(booking);
		Booking bookingObject = bookingRepo.findOne(bookingExample).get();
		
		//send email of payment						
		try {
			bookingObject.setCheckedOut(true);
			long offset = checkOutTime.getTimezoneOffset()*60*1000;			
			checkOutTime.setTime(checkOutTime.getTime()-offset);
			bookingObject.setCheckOutTime(checkOutTime);
			bookingRepo.save(bookingObject);
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


	@Scheduled(fixedDelay = 10000)
	public void adjustBookings() {
		
		Date d = Date.from(myClock.instant());
		
		Booking bTemp = new Booking();
		bTemp.setCheckedOut(false);
		Example<Booking> bExample = Example.of(bTemp);
		List<Booking> allBookings = bookingRepo.findAll(bExample);
		
		if(allBookings.isEmpty()) {
			return;
		}
		
		for(Booking b : allBookings) {
			if(d.getTime() - b.getEndDate().getTime() > 0) {
				try {
					System.out.println("Current date time = "+d);
					Date checkOutTime = b.getEndDate();
					checkOutTime.setHours(11);
					checkOut(b.getPropertyID(), b.getStartDate(), b.getEndDate(), b.getBookedPrice() , checkOutTime);
					sendEmail(b.getUserID(), "Automatic check out", "You have been automatically checked out on "+b.getEndDate()+" for your booking at ID - "+b.getPropertyID());
					System.out.println("Required adjustment - mail sent");
				} 
				catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		
		
		
	}

	
	

}
