package com.testproject.springsecurityjpamysql.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.testproject.springsecurityjpamysql.model.Property;


public interface PostingsRepository extends JpaRepository<Property, String> {



}
