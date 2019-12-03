package com.testproject.springsecurityjpamysql.resource;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.NoSuchElementException;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
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
    JavaMailSender sender;

	
	@GetMapping(value = "/landing") 
	public ResponseEntity<String> loginWithGoogle(OAuth2Authentication p) {
		
		LinkedHashMap<String, Object> properties = (LinkedHashMap<String, Object>) p.getUserAuthentication().getDetails();
		String userID = (String) properties.get("email");
				
		try {
			UserProfile user = uService.getUserObject(userID);
			return ResponseEntity.status(HttpStatus.OK).body("Google auth successful");			
		}
		catch(NoSuchElementException e) {
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Google auth failed. Please register with your Google email first");

		}
				
	}

	
	@PostMapping(value = "register" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> register(@RequestBody Object userJSON) {
		
		//create UserProfile object from JSON payload
		Gson g = new Gson();
		UserProfile user = g.fromJson(g.toJson(userJSON), UserProfile.class);	
		user.setVerified(false);
		
		//Add user to database
		uService.registerUser(user);
		
		String link = "http://localhost:8080/user/activate/"+user.getUserID();
		
		try {
			sendEmail(user.getUserID() , "OpenHome Account Activation", "Click here to activate ->"+link);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if (uService.getUserObject(user.getUserID()).getUserID() == user.getUserID() )
			return ResponseEntity.status(HttpStatus.OK).body("Registration successful");
		
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User was not registered");
	}
	
	@GetMapping(value = "test")
	public String test() {
		return "In!";
	}
	
	
	@GetMapping(value = "activate/{userID}")
	public String activate(@PathVariable String userID) {
		
		uService.verifyUser(userID);
				
		return "Activation successful";
	}
	
	@PostMapping(value = "login" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> login(@RequestBody Object userCred) {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(userCred), Map.class);	
		String userID = (String) map.get("userID");
		String password = (String) map.get("password");
		String role = (String)map.get("role");
		
		UserProfile user = uService.getUserObject(userID);
		
		return user.getPassword().equals(password) && 
				user.getUserID().equals(userID)  &&
				user.getRole().contentEquals(role) &&
				user.getVerified() ? 
					ResponseEntity.status(HttpStatus.OK).body("Login successful"): 
						ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Login failed");
								
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
