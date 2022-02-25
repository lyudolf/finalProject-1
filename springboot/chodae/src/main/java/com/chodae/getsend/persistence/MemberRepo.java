//package com.chodae.getsend.persistence;
//
//import java.util.List;
//
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.CrudRepository;
//
//import com.chodae.getsend.domain.Member;
//
//public interface MemberRepo extends CrudRepository<Member, String>{
//	
//	@Query("SELECT m.uid, count(p) FROM Member m LEFT OUTER JOIN Profile p ON m.uid = p.member WHERE m.uid = ?1 Group BY m")
//	public List<Object[]> getMemberWithProfileCount(String uid);
//	
//	@Query("SELECT m,p FROM Member m LEFT OUTER JOIN Profile p ON m.uid = p.member WHERE m.uid = ?1 And p.current = true")
//	public List<Object[]> getMemberWithProfile(String uid);
//	
//	
//
//}
