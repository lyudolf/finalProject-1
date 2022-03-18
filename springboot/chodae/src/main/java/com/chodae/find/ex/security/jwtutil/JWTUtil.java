package com.chodae.find.ex.security.jwtutil;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.chodae.find.ex.security.dto.MemberAuthDTO;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.InvalidKeyException;
import io.jsonwebtoken.security.Keys;
import lombok.extern.java.Log;

@Log
public class JWTUtil {
	
	//signature
	private String SECRET_KEY = "qpalxksjzFNJIDNJIkfjvjdhfurtsnclop23mdi5fDNJIhdudifndjd8f73w4u4fnui"; 
	
	Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
	

	private long accessExpire = 60*5; //유효기간: 2시간! 
	private long refreshExpire = 60*24*14; //유효기간 : 2주 
	
	public String generateAccessToken(MemberAuthDTO memberDTO) throws InvalidKeyException, UnsupportedEncodingException {
		
		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(accessExpire).toInstant()))
//				.setExpiration(Date.from(ZonedDateTime.now().plusSeconds(2).toInstant()))
				.setSubject(memberDTO.getUsername())
				.claim("iss", "chodae")
				.claim("member", memberDTO)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	public String generateRefreshToken(MemberAuthDTO memberDTO) throws InvalidKeyException, UnsupportedEncodingException {
		
		
		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(refreshExpire).toInstant()))
				.setSubject(memberDTO.getUsername())
				.claim("iss", "chodae")
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public Claims validateExtract(String tokenString) {
		
		String contentValue = null;
		
		 Jws<Claims> jws = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(tokenString);
		 
		 log.info("@@@@@@@@@@@@토큰해체결과"+jws);
		 
		 
		 Claims claim =  jws.getBody();
		 
		 
		 
//		 JSONObject jo = new JSONObject(claim);
//		 
//		 String username = (String) jo.get("sub");
//		 
//		 JSONObject member = jo.getJSONObject("member");
//		 JSONArray authorities = member.getJSONArray("authorities");
//		 JSONObject role2 = authorities.getJSONObject(0);
//		 String role =  role2.getString("authority");
//		 Collection<SimpleGrantedAuthority> authoritiesList = new ArrayList<>();
//		 authoritiesList.add(new SimpleGrantedAuthority(role));
		 
		 
		 
//			 authorities.add(new SimpleGrantedAuthority(role));
		 
//		
//		 log.info("@@@@@@@@@@@@@@@@해체한 토큰 claim"+claim);
//		 log.info("@@@@@@@@@@@@@@@@해체한 토큰 username"+username);
//		 log.info("@@@@@@@@@@@@@@@@해체한 토큰 member"+member);
//		 log.info("@@@@@@@@@@@@@@@@해체한 토큰 authorities"+authorities);
//		 log.info("@@@@@@@@@@@@@@@@해체한 토큰 authorities"+authoritiesList);
//		 
	
		
//		 UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, authoritiesList);
		// 권환확인
		// 들어오는 jwt 토큰 만료시간 확인
		 
		 
		
		return claim;
		
		
	}
	
}
