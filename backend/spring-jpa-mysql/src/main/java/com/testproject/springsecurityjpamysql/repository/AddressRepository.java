package com.testproject.springsecurityjpamysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.springsecurityjpamysql.model.Address;


public interface AddressRepository extends JpaRepository<Address, Integer> {

	
}
