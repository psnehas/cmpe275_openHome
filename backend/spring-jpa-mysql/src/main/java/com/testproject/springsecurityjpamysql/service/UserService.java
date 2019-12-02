package com.testproject.springsecurityjpamysql.service;

import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	public void addUser(UserProfile user) {
		
		userRepo.save( user );
		
	}

	public UserProfile getUserObject(String userid) {
		
		try {
			return userRepo.findById(userid).get();
		}
		catch(NoSuchElementException e) {
			System.out.println("No such user can be found");
		}
		
		return null;		
	}

	
}
