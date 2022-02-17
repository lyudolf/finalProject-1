package com.chodae.getsend.persistence;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.chodae.getsend.User;

public interface UserRepository extends CrudRepository<User, Integer>{
	
	//쿼리메소드 : 메소드의 이름만으로 필요한 쿼리를 만들어내는 기능 지원  Select만 가능?
	//메소드 네이밍 rule : ex) find(엔티티이름)By(컬럼명)  
	public List<User> findUserByName(String name); 
}
