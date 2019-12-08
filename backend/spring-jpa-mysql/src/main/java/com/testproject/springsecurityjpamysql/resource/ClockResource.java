package com.testproject.springsecurityjpamysql.resource;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.MyClock;
import com.testproject.springsecurityjpamysql.service.BookingService;

@RequestMapping("/clock")
@CrossOrigin(origins = "*")
@RestController
public class ClockResource {
	
	@Autowired
	MyClock clock;
	
	@Autowired
	BookingService bookingService;
	
	@SuppressWarnings("deprecation")
	@PostMapping(value = "/jump")
	public Instant jump(@RequestBody Object instantObject) throws ParseException {
			
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(instantObject), Map.class);	
		String dateString = (String) map.get("date");
		String hours = (String) map.get("hours");
		String minutes = (String) map.get("minutes");
		
		System.out.println(dateString+" "+hours+":"+minutes);
		
		Date d = new SimpleDateFormat("yyyy-MM-dd HH:mm").parse(dateString+" "+hours+":"+minutes);
						
		clock.jumpTo(d , hours , minutes);
				
		bookingService.adjustBookings();
				
		return clock.instant();
		
	}
	
	@GetMapping(value = "/current")
	public String getCurrent() {
		
		return clock.getTime();
	}
		
	

	
	
	
}
