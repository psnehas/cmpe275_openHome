package com.testproject.springsecurityjpamysql.model;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class MyClock extends Clock {

	private Clock myclock;
	
	public MyClock() {	 
//		System.out.println(ZoneId.getAvailableZoneIds());
		myclock = Clock.systemDefaultZone();
		myclock = Clock.offset(myclock, Duration.ofHours(-8));
		System.out.println("Instant - "+myclock.instant());
	}
	
	
	@SuppressWarnings("deprecation")
	public String jumpTo(Date newDate, String hours, String minutes) {
		
		Instant current = instant();
		Date currentDate = Date.from(current);
//		System.out.println(year+" "+month);
		
//		System.out.println("Year = "+current.get(ChronoField.YEAR_OF_ERA));
//		Date currentDate = new Date(current.get(ChronoField.YEAR_OF_ERA) ,
//									current.get(ChronoField.MONTH_OF_YEAR) , 
//									current.get(ChronoField.DAY_OF_MONTH ));
//		
//		
		
		long diff = newDate.getTime() - currentDate.getTime();				
		myclock = Clock.offset(myclock, Duration.ofMillis(diff));	
		myclock = Clock.offset(myclock, Duration.ofHours(-8));
		
		 
		
//		long extraMinutes = Integer.parseInt(hours)60 + Integer.parseInt(minutes);		
//		myclock = Clock.offset(myclock, Duration.ofMinutes(extraMinutes));
		
		return myclock.toString();
		
	}

	@Override
	public Instant instant() {
		Instant instant = myclock.instant();
		return instant;
	}
	
	public String getTime() {
		return myclock.instant().toString();
	}
	
	@Override
	public ZoneId getZone() {
		return null;
	}

	@Override
	public Clock withZone(ZoneId zone) {
		return null;
	}

	
}
