package com.chodae.finds;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.find.category.MemberRole;
import com.chodae.find.domain.User;
import com.chodae.find.repository.UserRepository;

@ExtendWith(SpringExtension.class)
@ContextConfiguration
@SpringBootTest
public class UserRepositoryTests {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
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
	String login_id = "loginid";
	String password = "비밀번호";
	String name = "이름";
	String email = "aaa@aaa.com";
	String nickname = "닉네임";
	String status = "T";
	
	@Test
	public void testInsert() {
		
		User user = new User();
		user.setLoginId(login_id);
		user.setPassword(password);
		user.setName(name);
		user.setEmail(email);
		
		user.setNickname(nickname);
		user.setStatus(status);
		
		
		
		userRepo.save(user);
	
	}
	
	@Test
	public void testSelect() {
		Optional<User> user  = userRepo.findById(1L);
		System.out.println(user.toString());
//		userRepo.findById(1).ifPresent((user1)->{
//			System.out.println(user1);
//		});
	}
	
	@Test
	public void testUpdate() {
		Optional<User> userInfo  = userRepo.findById(1L);
		if(userInfo.isPresent()) {
			User user = userInfo.get();
			user.setName("변경할이름");
			userRepo.save(user);			
		}
		
	}
	
	@Test
	public void testDelete() {
		userRepo.deleteById(1L);
	}
	
	@Test
	public void testDeleteAll() {
		userRepo.deleteAll();
	}
	
	
	//유저 테스트 데이터 입력 + 권한
	@Test
	public void testInsert100() {
		
		for(int i = 1; i <=100;i++) {
			
			User user = new User();
			user.setPassword(passwordEncoder.encode("11111"));
			user.setName(name);
			user.setEmail(i+email);
			user.setNickname(nickname+i);
			user.setStatus(status);
			user.setLoginId(login_id+i);
			user.setSocial(false);
			
//			user.addMemberRole(MemberRole.USER);
			
			if( i > 95) {
				//95번 이상 멤버는 추가로 관리자 권한 부여
//				user.addMemberRole(MemberRole.ADMIN);
			}
			
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
	@Test
	public void testFindId() {
		userRepo.findUserByNameAndEmail("이름1", "aaa@aaa.com1").forEach(user -> System.out.println(user));
		
	}
	@Test
	public void testFindNameContaining() {
		userRepo.findUserByNameContainingOrderByNameDesc("이름").forEach(user -> System.out.println(user));
		
	}
	@Test
	public void testFindNameContainingPaging() {
		Pageable paging =  PageRequest.of(0, 10); //0페이지, 10건의 데이터를 가져와라.
		List<User> results = userRepo.findUserByNameContainingOrderByNameDesc("이름",paging);
		results.forEach(user -> System.out.println(user));
		
		
	}
	
	@Test
	public void testFindNickName() {
		Pageable paging  = PageRequest.of(0, 10, Sort.Direction.DESC, "id" );
		
		Page<User> result = userRepo.findUserByNicknameContaining("닉네임", paging);
		
		System.out.println("현재페이지정보 = "+ result.getNumber());
		System.out.println("getsize() 한페이지의크기 = "+ result.getSize());
		System.out.println("total pages = "+ result.getTotalPages());
		System.out.println("total count = "+ result.getTotalElements());
		System.out.println("결과데이터수  = "+ result.getNumberOfElements());
		System.out.println("이전페이지존재여부  = "+ result.hasPrevious());
		System.out.println("다음페이지의 존재여부  = "+ result.hasNext());
		System.out.println("마지막 페이지 여부   = "+ result.isLast());
		System.out.println("다음 페이지 객체  = "+ result.nextPageable());
		System.out.println("이전페이지객체 = "+ result.previousPageable());
		System.out.println("결과 존재여부 = "+ result.hasContent());
		System.out.println("검색시 사용된 sort정보= "+ result.getSort());
		
		List<User> list = result.getContent();
		list.forEach(user -> System.out.println(user));
		
		
		
	}
	
//	@Test
//	public void findUserByNameContaining() {
//		userRepo.findUserByNameContaining(name).forEach(user -> System.out.println(user));
//		
//		
//	}
	@Test
	public void findUserByNameContaining() {
		userRepo.findUserByNameContaining(name).forEach(arr -> System.out.println(Arrays.deepToString(arr)));
		
		
	}
}
