package com.chodae.find5.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.chodae.find.domain.User;

public interface UserRepo extends JpaRepository<User, Long> {

	List<User> findUserByNameAndEmail(String name, String email);////////////////////////// 아이디 찾기 
	
	List<User> findUserByLoginIdAndEmail(String loginId, String email);////////////////////////// 비밀번호 찾기  - 유저 확인
	
	//update , delete, insert 시 @Transctional, @Modifying 어노테이션 필요하다. 
	@Transactional
	@Modifying(clearAutomatically = true)
	@Query("UPDATE FROM User u set u.pwd = ?2 WHERE u.loginId =?1")
	int updatePassword(String id, String pwd);
	
	User findUserByNickname(String nickname);
	
}
