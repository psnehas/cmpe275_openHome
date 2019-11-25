package com.testproject.springsecurityjpamysql.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.service.SearchService;

@RequestMapping("/search")
@CrossOrigin(origins = "*")
@RestController
public class SearchResource {
	
	@Autowired
	SearchService searchService;

	@GetMapping
	public List<Property> getPostsInitial() {
		
		return searchService.getPostings();

	}

}
