package com.testproject.springsecurityjpamysql;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;

@SpringBootApplication
public class SpringSecurityJpaMysqlApplication {
		
	
	public static void main(String[] args) {
		SpringApplication.run(SpringSecurityJpaMysqlApplication.class, args);
	}
	
	
	@Bean
	public LocalEntityManagerFactoryBean entityManagerFactory(){
	     LocalEntityManagerFactoryBean factoryBean = new LocalEntityManagerFactoryBean();
	    factoryBean.setPersistenceUnitName("OpenHome");
	    return factoryBean;
	}
}
