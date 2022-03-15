//package com.chodae.find.ex.security.service;
//
//import java.util.Optional;
//import java.util.stream.Collectors;
//
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.chodae.find.domain.User;
//import com.chodae.find.ex.security.dto.MemberAuthDTO;
//import com.chodae.find5.repository.UserRepo;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.java.Log;
//
//@Log
//@Service
//@RequiredArgsConstructor
//public class MemberUserDetailsService implements UserDetailsService{
//	
//	private final UserRepo userRepo;
//	
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		log.info("MemberUserDetail - loadUserByUsername:"+username);
//		
//		Optional<User> result = userRepo.findByLoginId(username, false);
//		
//		if(!result.isPresent()) {
//			throw new UsernameNotFoundException("loginId를 다시 확인해주세요");
//		}
//		
//		User member = result.get();
//		
//		log.info(""+member);
//		
//		MemberAuthDTO authMember = new MemberAuthDTO(
//				member.getLoginId(),
//				member.getPassword(),
//				member.isSocial(),
//				member.getRoleSet().stream()
//					.map(role -> 
//					new SimpleGrantedAuthority("ROLE_"+role.name())).collect(Collectors.toSet())
//					);
//		
//		authMember.setNickname(member.getNickname());
//		authMember.setEmail(member.getEmail());
//		
//		
//		
//		return authMember;
//	}
//	
//	
//}
