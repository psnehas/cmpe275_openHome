package com.testproject.springsecurityjpamysql.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.springsecurityjpamysql.model.UserProfile;

public interface UserRepository extends JpaRepository<UserProfile, String> {
	
	Optional<UserProfile> findByFirstName(String firstName);

}

