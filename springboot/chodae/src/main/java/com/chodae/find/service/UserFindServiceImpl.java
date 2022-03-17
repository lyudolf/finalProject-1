package com.chodae.find.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chodae.find.domain.User;
import com.chodae.find.repository.UserRepository;
import com.chodae.find5.repository.UserRepo;

import lombok.extern.java.Log;

@Log
@Service
public class UserFindServiceImpl implements UserFindService {
	
	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Autowired
	public UserFindServiceImpl(UserRepo userRepo,PasswordEncoder passwordEncoder) {
		this.userRepo = userRepo;
		this.passwordEncoder = passwordEncoder;
	}
 

	@Override
	public String searchId(String name, String email) {
		log.info(name+"~~~"+email);
		List<User> list = userRepo.findUserByNameAndEmail(name, email);
		
		User user = new User();
		
		if(!list.isEmpty()) {
			user = list.get(0);
			log.info(user.getLoginId());
			return user.getLoginId();
		}
		return null;
	}


	@Override
	public List<User> isUser(String loginId, String email) {
		log.info(loginId+"~~~"+email);
		List<User> list = userRepo.findUserByLoginIdAndEmail(loginId, email);
		return list;
	}

	//업데이트 
	@Override
	public int updatePassword(String id, String password) {
		log.info(id+"~@@"+password);
		return userRepo.updatePassword(id, passwordEncoder.encode(password));
	}
	

}
