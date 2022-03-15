//package com.chodae.find.ex.security.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//
//import com.chodae.find.ex.security.filter.HeaderCheckFilter;
//import com.chodae.find.ex.security.filter.LoginFilter;
//import com.chodae.find.ex.security.handler.LoginFailHandler;
//import com.chodae.find.ex.security.jwtutil.JWTUtil;
//
//import lombok.extern.log4j.Log4j2;
//
//@Log4j2
//@Configuration @EnableWebSecurity
//public class SecurityConfig extends WebSecurityConfigurerAdapter{
//	
//	
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//		
//		http.csrf().disable();
//		http.cors().configurationSource(corsConfigurationSource());		
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//		
////		http.authorizeHttpRequests().antMatchers("/**").permitAll()
////									.antMatchers("/sample/member").hasRole("USER");
//		
//		http.authorizeRequests()
//				.antMatchers("/sample/all").permitAll()
//				.antMatchers("/sample/member").hasRole("USER");
//		
//		http.formLogin();
//		http.logout();
//		
//		
//		http.addFilterBefore(checkFilter(), UsernamePasswordAuthenticationFilter.class);
//		http.addFilterBefore(loginFilter(), UsernamePasswordAuthenticationFilter.class);
//		
//		
//		
////		.and()
////		.cors().configurationSource(corsConfigurationSource());
//		
//		
////		http.authorizeRequests().anyRequest().authenticated();//나머지 요청들은 모두 인증되어야함
//		
//		
//	}
//	
//	//접근제한목록 (Access Control List)
//	
//	
//	
//	// CORS 허용 적용
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//    	
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.addAllowedOrigin("http://localhost:3000");
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//        configuration.setAllowCredentials(true);
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
//    }
//	
//    @Bean
//    PasswordEncoder passwordEncoder() {
//    	return new BCryptPasswordEncoder();
//    }
//    
//    @Bean
//    public JWTUtil jwtUtil() {
//    	return new JWTUtil();
//    }
//    
//    @Bean
//    public HeaderCheckFilter checkFilter() {
//    	return new HeaderCheckFilter("**",jwtUtil());
//    }
//    
//    @Bean
//    public LoginFilter loginFilter() throws Exception {
//    	
//    	LoginFilter loginFilter = new LoginFilter("/api/login", jwtUtil());
//    	
//    	loginFilter.setAuthenticationManager(authenticationManager());
//    	
//    	loginFilter.setAuthenticationFailureHandler(new LoginFailHandler());
//    	
//		return loginFilter;
//    	
//    }
//    
//
//	
//}
