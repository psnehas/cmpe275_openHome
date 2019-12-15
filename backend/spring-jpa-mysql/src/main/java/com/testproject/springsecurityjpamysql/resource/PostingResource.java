package com.testproject.springsecurityjpamysql.resource;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.testproject.springsecurityjpamysql.model.Address;
import com.testproject.springsecurityjpamysql.model.Filter;
import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;
import com.testproject.springsecurityjpamysql.service.SearchService;

@RequestMapping("/posting")
@CrossOrigin(origins = "*")
@RestController
public class PostingResource {
	
	@Autowired
	SearchService searchService;
	
	@Autowired
	PostingsRepository prepo;

	/*
	 * Gets all listings for the given filter
	 */	
	
	@PostMapping(value = "/search" , consumes = MediaType.APPLICATION_JSON_VALUE)
	public List<Property> getPosts(@RequestBody Object filterJSON) throws IllegalArgumentException, IllegalAccessException {
				
		Gson g = new Gson();				
		Filter filter = g.fromJson(g.toJson(filterJSON), Filter.class);		
		return searchService.getPostings(filter);

	}

	
	@GetMapping("/test")
	public List<Property> testMethod() {
		
		Property p = new Property();
		Address a = new Address();
		a.setCity("San Jose");
		p.setAddress(a);
		Example<Property> propExample = Example.of(p);
		return prepo.findAll(propExample);		
		
	}
	
		
	/*
	 * Get all properties with no filter
	 */
	@GetMapping(value="/all")
	public List<Property> getAllPostings(@RequestBody Object newPostObj) {
		
		return searchService.findAllProps();
		
	}
	
	
	/*
	 * Post a new place
	 */
	@PostMapping(value = "/place")
	public void addPosting(@RequestBody Object newPropertyJSON) {
		
		Gson g = new Gson();				
		Property p = g.fromJson(g.toJson(newPropertyJSON), Property.class);	
		searchService.addPosting(p);

	}
	
	@PutMapping(value = "/place")
	public void editPosting(@RequestBody Object oldPropertyJSON) {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(oldPropertyJSON), Map.class);	
		Integer propertyID = Integer.parseInt(map.get("propertyID").toString());	
		Property p = g.fromJson(g.toJson(oldPropertyJSON), Property.class);		
		p.setPropertyID(propertyID);
		searchService.addPosting(p);
		
	}
	
	/*
	 * POST A NEW RATING
	 */
	@PostMapping(value = "/rating")
	public ResponseEntity<Object> postNewRating(@RequestBody Object newRatingJSON) {
		
		Gson g = new Gson();
		Map map = g.fromJson(g.toJson(newRatingJSON), Map.class);	
		Integer propertyID = Integer.parseInt(map.get("propertyID").toString());
		Double rating = Double.parseDouble(map.get("rating").toString());
		
		return searchService.addRating(propertyID , rating);
	}
	
	

}
