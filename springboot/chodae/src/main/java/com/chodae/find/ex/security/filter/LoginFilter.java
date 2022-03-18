package com.chodae.find.ex.security.filter;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import com.chodae.find.ex.security.dto.MemberAuthDTO;
import com.chodae.find.ex.security.jwtutil.JWTUtil;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.java.Log;

@Log
public class LoginFilter extends AbstractAuthenticationProcessingFilter {
	
	private JWTUtil jwtUtil;

	public LoginFilter(String defaultFilterProcessesUrl, JWTUtil jwtUtil) {
		super(defaultFilterProcessesUrl);
		this.jwtUtil = jwtUtil;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException, IOException, ServletException {


		log.info("@@@@@@@@@@loginFilter@@@@@@@@@@@@@");
		log.info("@@@@@@@@@attemptAuthentication@@@@@@@@@");
		
		
		String loginId = request.getParameter("loginId");
		String pw = request.getParameter("password");
		log.info(loginId+" ::::::" + pw);
		
		//포스트 방식으로 로그인하고 파라미터는 암호화해서 처리
		
		
		if(loginId == null) {
			throw new BadCredentialsException("아이디가 null입니다. ");
		}
		
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(loginId, pw);
		//직접인증처리함. => 다음단계는 인증후 성공 , 실패에 대한 후속 작업
		
		return getAuthenticationManager().authenticate(authToken);
	}
	
	@Override  //인증 성공시 
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		log.info("@@@@@@@@@@@@@@apilogin=> success@@@@@@@@@@@@@@@@@");
		log.info("authResult:"+authResult);
		log.info("authResult.getPrincipal():"+authResult.getPrincipal());
		
		MemberAuthDTO userDTO = (MemberAuthDTO)authResult.getPrincipal();
		String userName = userDTO.getUsername();
		Object info = authResult.getPrincipal();
		
		log.info("info => "+info);
		log.info("MemberAuthDTO => "+userDTO);
		log.info("getUsername() => "+userName);
		
		String accessToken = null;
		String refreshToken = null;
		
		try {
			
			accessToken = jwtUtil.generateAccessToken(userDTO);
			refreshToken = jwtUtil.generateRefreshToken(userDTO);
			
			 Map<String, String> tokens = new HashMap<>();
		        tokens.put("accessToken",accessToken);
		        tokens.put("refreshToken",refreshToken);
			
			response.setContentType("aplication/json;charset=utf-8");
//			response.getOutputStream().write(accessToken.getBytes());
			new ObjectMapper().writeValue(response.getOutputStream(), tokens);
			
			
			log.info("token => "+accessToken);
			
		} catch(Exception e ) {
			e.printStackTrace();
		}
		
	}
}
