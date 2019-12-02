package com.testproject.springsecurityjpamysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.springsecurityjpamysql.model.Booking;


public interface BookingRepository extends JpaRepository<Booking, Integer> {

	

}
