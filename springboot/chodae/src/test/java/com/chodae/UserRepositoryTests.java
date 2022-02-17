package com.chodae;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.getsend.User;
import com.chodae.getsend.persistence.UserRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
public class UserRepositoryTests {
	
	@Autowired
	private UserRepository userRepo;
	
	@Test
	public void inspect() {
		
		//실제 객체의 클래스 이름
		Class<?> clz = userRepo.getClass();
		
		System.out.println(clz.getName());
		
		//클래스가 구현하고 있는 인터페이스 목록 
		Class<?>[] interfaces = clz.getInterfaces();
		
		Stream.of(interfaces).forEach(inter -> System.out.println(inter.getName())); 
		
		Class<?> superClasses = clz.getSuperclass();
		
		System.out.println(superClasses.getName());
		
	}
	
	@Test
	public void testInsert() {
		
		User user = new User();
		user.setPwd("비밀번호1");
		user.setName("이름");
		user.setCrdate(LocalDateTime.now());
		
		userRepo.save(user);
	}
	
	@Test
	public void testSelect() {
		Optional<User> user  = userRepo.findById(1);
		System.out.println(user.toString());
	}
	
	@Test
	public void testUpdate() {
		Optional<User> userInfo  = userRepo.findById(1);
		if(userInfo.isPresent()) {
			User user = userInfo.get();
			user.setName("변경할이름");
			userRepo.save(user);			
		}
		
	}
	
	@Test
	public void testDelete() {
		userRepo.deleteById(1);
	}
	
	@Test
	public void testDeleteAll() {
		userRepo.deleteAll();
	}
	
	
	
	@Test
	public void testInsert20() {
		for(int i = 1; i <=20;i++) {
			User user = new User();
			user.setPwd("비밀번호"+i);
			user.setName("이름"+i);
			user.setCrdate(LocalDateTime.now());
			
			userRepo.save(user);
		}
	}
	
	@Test
	public void testQueryMethod() {
		List<User> user = userRepo.findUserByName("이름2");
		System.out.println(user.toString());
		
//		forEach 구문 사용하여 데이터 출력가능
//		userRepo.findUserByName("이름2").forEach(user1 -> System.out.println(user1));
		
	}
}
