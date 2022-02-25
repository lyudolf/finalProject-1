package com.chodae.finds;
//package com.chodae;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.stream.IntStream;
//
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//import org.springframework.test.context.junit.jupiter.SpringExtension;
//
//import com.chodae.getsend.domain.Member;
//import com.chodae.getsend.domain.Profile;
//import com.chodae.getsend.persistence.MemberRepo;
//import com.chodae.getsend.persistence.ProfileRepo;
//
//import lombok.extern.java.Log;
//
//@Commit
//@Log
//@ExtendWith(SpringExtension.class)
//@SpringBootTest
//public class ProfileTest {
//
//	@Autowired
//	MemberRepo memberRepo;
//	
//	@Autowired
//	ProfileRepo profileRepo;
//	
//	@Test
//	public void testInsertMembers() {
//		IntStream.range(1, 21).forEach(i -> {
//			Member member = new Member();
////			member.setUid("user"+i);
////			member.setUpw("pw"+i);
////			member.setUname("이름"+i);
//			memberRepo.save(member);
//		});
//	}
//	
//	@Test
//	public void deleteAll() {
//		profileRepo.deleteAll();
//		memberRepo.deleteAll();
//		
//	}
//	
////	@Test
////	public void testInsertProfile() {
////		Member member = new Member();
////		member.setUid("user1");
////		
////		for(int i = 1; i <5; i++) {
////			Profile profile1 = new Profile();
////			profile1.setFname("face"+i+".jpg");
////			
////			if(i ==1) {
////				profile1.setCurrent(true);
////			}
////			
////			profile1.setMember(member);
////			profileRepo.save(profile1);
////		}
////	}
//	
//	@Test
//	public void testFetchJoin() {
//		List<Object[]> result = memberRepo.getMemberWithProfileCount("user1");
//		result.forEach(arr -> System.out.println(Arrays.toString(arr)));
//	}
//	@Test
//	public void testFetchJoin2() {
//		List<Object[]> result = memberRepo.getMemberWithProfile("user1");
//		result.forEach(arr -> System.out.println(Arrays.toString(arr)));
//	}
//
//}
