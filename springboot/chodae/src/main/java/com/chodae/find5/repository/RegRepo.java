package com.chodae.find5.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chodae.find.domain.User;

public interface RegRepo extends JpaRepository<User, Long> {

	@Query(value = "SELECT email FROM User_info WHERE email= :email",nativeQuery = true)
	String findbyMail(String email);
	
	@Query(value = "SELECT nickname FROM User_info WHERE nickname= :nickname",nativeQuery = true)
	String findbyNick(String nickname);
	
	@Query(value = "SELECT login_id FROM User_info WHERE login_id= :loginId",nativeQuery = true)
	String findbyId(String loginId);
}
