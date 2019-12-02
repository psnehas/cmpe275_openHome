package com.testproject.springsecurityjpamysql.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.Address;
import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.AddressRepository;
import com.testproject.springsecurityjpamysql.service.UserService;

@RequestMapping("/user")
@CrossOrigin(origins = "*")
@RestController
public class UserResource {

	@Autowired
	UserService uService;
	
	@Autowired
	AddressRepository addr;

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public String addUser(@RequestBody Object userJSON) {
		
		//create UserProfile object from JSON payload
		Gson g = new Gson();
		UserProfile user = g.fromJson(userJSON.toString(), UserProfile.class);
		
		//Add user to database
		uService.addUser(user);
		
		return user.getUserID();
	}
	

}
