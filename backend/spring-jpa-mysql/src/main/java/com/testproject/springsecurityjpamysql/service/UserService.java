package com.testproject.springsecurityjpamysql.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.UserProfile;
import com.testproject.springsecurityjpamysql.repository.UserRepoImpl;
import com.testproject.springsecurityjpamysql.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository userRepo;
	
	public void addUser(UserProfile user) {
		
		userRepo.save( user );
		
	}
	
}
