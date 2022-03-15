package com.chodae.find.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chodae.find.category.MemberRole;
import com.chodae.find.domain.User;
import com.chodae.find.dto.MemberDTO;
import com.chodae.find5.repository.RegRepo;
import com.chodae.find5.repository.UserRepo;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class RegService {

	private final RegRepo regRepo;
	private final UserRepo userRepo;
	private final BCryptPasswordEncoder passwordEncoder;
	
	
	//일반회원 가입시
	@Transactional //서비스 함수가 종료 될떄 commit 할지 rollback 할지 관리
	public User regSave(User user) {
		
		log.info("@@@@@@@@@@@@@"+user+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
		
		if(user == null || user.getLoginId() == null|| user.getPassword() == null) {
			throw new RuntimeException("회원가입시 정보 부족");
		}
		
		String loginId = user.getLoginId();
		
		if(userRepo.existsByLoginId(loginId)) {
			log.warn("아이디가 이미 존재합니다. {}", loginId);
			throw new RuntimeException("Id already exists");
		}
		
		
		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		user.addMemberRole(MemberRole.USER);//추후수정
		user.setSocial(false);
		User registeredMember = regRepo.save(user);
		
		return registeredMember; 
	}
	
	//로그인시 아이디 비밀번호 일치여부 확인할떄
	public User getByCredentials(String loginId, String password, BCryptPasswordEncoder passwordEncoder) {
		
		Optional<User> result = userRepo.findByLoginId(loginId, false);
		
		User member = null;
		
		if(result.isPresent()) {
			member = result.get();
			if(passwordEncoder.matches(password, member.getPassword())) {
				return member;
			}
			
		}
		
		
		return null;
		
	}
	
	
	
@Transactional(readOnly=true)
	public User getOneReg(Long id) {
		return regRepo.findById(id).orElseThrow(() -> new IllegalArgumentException("id확인바람"));
	}
@Transactional(readOnly=true)
	public List<User> getAllReg() {
		return regRepo.findAll();
	}
@Transactional
public User updateReg(Long id, User user) {
	User studyEntity= regRepo.findById(id)
			.orElseThrow(()->new IllegalArgumentException("id를 확인해주세요"));
	studyEntity.setId(user.getId());
	studyEntity.setPassword(user.getPassword());
	return studyEntity;
}
public String deleteReg(Long id) {
	regRepo.deleteById(id);
	return "okay";
}
public String mailCheck(String email) throws Exception{
	System.out.println("여기옴?");
	System.out.println(email);
	String Eresult = regRepo.findbyMail(email);
	System.out.println(Eresult);
	return Eresult;
}
public String nickCheck(String nickname) throws Exception{
	System.out.println("여기옴?");
	System.out.println(nickname);
	String Nresult = regRepo.findbyNick(nickname);
	System.out.println(Nresult);
	return Nresult;
}
public String idCheck(String loginId) throws Exception{
	System.out.println("여기옴?");
	System.out.println(loginId);
	String Iresult = regRepo.findbyId(loginId);
	System.out.println(Iresult);
	return Iresult;
}
}

//함수
