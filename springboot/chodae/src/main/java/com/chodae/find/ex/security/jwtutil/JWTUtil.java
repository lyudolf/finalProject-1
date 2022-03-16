package com.chodae.find.ex.security.jwtutil;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

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
	
	private long expire = 60*24*30; //한달
	
	public String generateToken(MemberAuthDTO memberDTO) throws InvalidKeyException, UnsupportedEncodingException {
		
		return Jwts.builder()
				.setIssuedAt(new Date())
				.setExpiration(Date.from(ZonedDateTime.now().plusMinutes(expire).toInstant()))
//				.setExpiration(Date.from(ZonedDateTime.now().plusSeconds(2).toInstant()))
				.claim("iss", "chodae")
				.claim("sub", memberDTO.getUsername())
				.claim("member", memberDTO)
				.signWith(key, SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String validateExtract(String tokenString) {
		
		String contentValue = null;
		
		 Jws<Claims> jws = Jwts.parserBuilder()
				.setSigningKey(key)
				.build()
				.parseClaimsJws(tokenString);
		 
		 log.info(""+jws);
		 
		 Claims claim =  jws.getBody();
		 log.info(""+claim);
		
		contentValue = claim.getSubject();
		return contentValue;
		
		
	}
	
}
