package com.testproject.springsecurityjpamysql;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.orm.jpa.LocalEntityManagerFactoryBean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

import com.testproject.springsecurityjpamysql.model.MyClock;

@SpringBootApplication
@EnableScheduling
public class SpringSecurityJpaMysqlApplication {

	
	public static void main(String[] args) {
		
		SpringApplication.run(SpringSecurityJpaMysqlApplication.class, args);
	}
	
	
//	@Scheduled(fixedDelay = 5000)
//	public static void test() {
//		System.out.println("Testing cron job");
//	}
//	
//	
//	@Bean
//	public LocalEntityManagerFactoryBean entityManagerFactory(){
//	     LocalEntityManagerFactoryBean factoryBean = new LocalEntityManagerFactoryBean();
//	    factoryBean.setPersistenceUnitName("OpenHome");
//	    return factoryBean;
//	}
}
