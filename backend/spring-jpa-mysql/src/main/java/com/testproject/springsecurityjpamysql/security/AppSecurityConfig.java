package com.testproject.springsecurityjpamysql.security;

import java.util.Arrays;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableOAuth2Sso
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

	@Override
 	protected void configure(HttpSecurity http) throws Exception {
		
		http.csrf().disable().authorizeRequests()
//		.antMatchers(HttpMethod.OPTIONS, "http://localhost:3000").permitAll()
		.antMatchers("/user/landing").authenticated()
		.anyRequest().permitAll()
		.and()
		.cors();
 		
		
//		http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/oauth/token").permitAll()
 	}
	
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		CorsConfiguration configuration = new CorsConfiguration();
//		configuration.setAllowedOrigins(Arrays.asList("*"));
//		configuration.setAllowedMethods(Arrays.asList("GET","POST"));
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/user/landing", configuration);
//		return source;
//	}
	
//	 @Override
//	    public void configure(WebSecurity web) throws Exception {
//	        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
//	    }
}
