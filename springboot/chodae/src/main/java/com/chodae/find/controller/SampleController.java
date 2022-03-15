package com.chodae.find.controller;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chodae.find.ex.security.dto.MemberAuthDTO;

import lombok.extern.java.Log;
import lombok.extern.log4j.Log4j2;

@Log
@RestController
public class SampleController {
	
	@GetMapping("/sample/all")
	public String exAll() {
		log.info("exAll...");
		return "exALL";
	}
	
	@GetMapping("/sample/admin")
	public String exAdmin() {
		log.info("exADMIN");
		return "exAdmin";
	}
	
	@GetMapping("/sample/member")
	public String printMember(@AuthenticationPrincipal MemberAuthDTO authMember) {
		
		log.info("/member ~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		log.info("/member ~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		log.info(""+authMember);
		return ""+authMember;
	}
}
