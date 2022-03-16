package com.chodae.find.controller;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chodae.find.domain.User;
import com.chodae.find.service.UserFindService;

import lombok.extern.java.Log;

@Log
@RestController
@RequestMapping("/api")
public class FindController {
	
	private final UserFindService userFindService;
	
	@Autowired
	public FindController(UserFindService userFindService) {
		this.userFindService = userFindService;
	}
	
	//성함+메일로 [로그인용 아이디] 찾기
	@GetMapping("/find/id")
	public String test(@RequestParam("name") String name, @RequestParam("email") String email) {
		log.info("이름:"+name+",이메일:"+email);
		//서비스 호출
		String foundId = userFindService.searchId(name, email);
		
		log.info(foundId);
		return foundId; 
	}
	
	
	//아이디와 이메일 일치하는 회원 존재시 -> 결과값 반환, 프론트에서는 비밀번호 재설정 창으로 이동
	@GetMapping("/find/user")
	public List<User> isUser(@RequestParam("loginId") String loginId, @RequestParam("email") String email) {
		List<User> list = userFindService.isUser(loginId, email);
		return list;
	}

	//비밀번호 재설정 : 비밀번호 업데이트 
	//암호화하여 저장
	@PutMapping("/find/ps")
	public int updatePs(@RequestParam("id") String id, @RequestParam("password") String password) {
		log.info("로그인아이디:"+id+",업데이트 비밀번호:"+password);
		return userFindService.updatePassword(id, password);
	}
	
	
}
