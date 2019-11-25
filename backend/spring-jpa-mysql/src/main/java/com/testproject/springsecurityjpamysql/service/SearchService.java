package com.testproject.springsecurityjpamysql.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.testproject.springsecurityjpamysql.model.Property;
import com.testproject.springsecurityjpamysql.repository.PostingsRepository;

@Service
public class SearchService {
	
	@Autowired
	PostingsRepository postRepo;
	
	public List<Property> getPostings() {
		
		Property p = new Property();
		p.setBooked(false);
		Example<Property> propExample = Example.of(p);	
		
		Iterable<Property> posts = postRepo.findAll(propExample);
		List<Property> result = new ArrayList<Property>();
		for(Property prop : posts) {
			result.add(prop);
		}
		
		return result;
	
	}

}
