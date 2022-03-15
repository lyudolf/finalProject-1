package com.chodae.find.ex.security.dto;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.java.Log;

@ToString
@Setter
@Getter
@Log
public class MemberAuthDTO extends User{
	
	private String loginId; //username ID에 해당 
	
	private boolean social;
	private String nickname;
	
	private String email;
	
	public MemberAuthDTO(String username, String password, boolean social, Collection<? extends GrantedAuthority> authorities) {
		super(username, password, authorities);
		
		this.loginId = username;
		this.social = social;
		
	}
	
	
	

}
