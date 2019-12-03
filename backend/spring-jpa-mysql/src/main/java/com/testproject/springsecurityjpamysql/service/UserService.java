package com.testproject.springsecurityjpamysql.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	public void registerUser(UserProfile user) {
		
		userRepo.save( user );
		
	}

	public UserProfile getUserObject(String userid) {
		
		try {
			return userRepo.findById(userid).get();
		}
		catch(NoSuchElementException e) {
			throw e;
		}
				
	}

	public void verifyUser(String userID) {
		
		UserProfile u = new UserProfile();
		u.setUserID(userID);
		
		
		Example<UserProfile> ex = Example.of(u);
		
		UserProfile user = userRepo.findOne(ex).get();
		user.setVerified(true);
		userRepo.save(user);
		
	}

	public void registerGoogleUser(String userID) {
		
		UserProfile u = new UserProfile();
		u.setUserID(userID);	
		Example<UserProfile> ex = Example.of(u);
		UserProfile user = userRepo.findOne(ex).get();
		if(user == null) {
			u.setPassword("googleUser");
		}
		
		
	}

	
}
