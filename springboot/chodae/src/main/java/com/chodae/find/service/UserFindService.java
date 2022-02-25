package com.chodae.find.service;

import java.util.List;
import java.util.Optional;

import com.chodae.find.domain.User;

public interface UserFindService {
	
	String searchId(String name, String email);
	List<User> isUser(String login_id,String email);
	int updatePassword(String id, String password);
	

}
