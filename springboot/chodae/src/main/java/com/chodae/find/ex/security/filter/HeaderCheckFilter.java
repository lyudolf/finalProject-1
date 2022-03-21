package com.chodae.find.ex.security.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.chodae.find.ex.security.jwtutil.JWTUtil;

import io.jsonwebtoken.Claims;
import lombok.extern.java.Log;

@Log   //리퀘스트 헤더 Authorization 헤더 추출하여 헤더의 값이 일치하는지 확인 
public class HeaderCheckFilter extends OncePerRequestFilter {
	
	private AntPathMatcher antPathMatcher;
	private String pattern;
	private JWTUtil jwtUtil;
	
	public HeaderCheckFilter(String pattern, JWTUtil jwtUtil) {
		this.antPathMatcher = new AntPathMatcher();
		this.pattern = pattern;
		this.jwtUtil = jwtUtil;
	}
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		log.info(request.getRequestURI());
		log.info(""+antPathMatcher.match(pattern, request.getRequestURI()));
		
		if(antPathMatcher.match(pattern, request.getRequestURI())) {

			log.info("CheckFilter pattern : "+pattern+" @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			
			if(request.getRequestURI().equals("/api/login")
					||request.getRequestURI().equals("/api/refresh")
					||request.getRequestURI().equals("/api/find/**")
					||request.getRequestURI().equals("/reg/**")) {
				log.info("@@@@@@ 해당 주소 토큰 검사 필요없음 @@@@@@@@@@@");
				filterChain.doFilter(request, response);
				return;
			} else {
				log.info("@@@@@@ 토큰 검사 필요 @@@@@@@@@@@");
				
				String authHeader = request.getHeader("Authorization");
				
				if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
					
					log.info("authorization Access exist : "+ authHeader);
					log.info(""+(authHeader == null));
					
					try {
						
						log.info("validate result  : "+ authHeader.substring(7));
						
						Claims claim = jwtUtil.validateAccessTokenExtract(authHeader.substring(7)); //권한, 유효시간 체크
						
						
						JSONObject jo = new JSONObject(claim);
						String username = (String) jo.get("sub");
						JSONObject member = jo.getJSONObject("member");
						JSONArray authorities = member.getJSONArray("authorities");
						JSONObject role2 = authorities.getJSONObject(0);
						String role =  role2.getString("authority");
						
						Collection<SimpleGrantedAuthority> authoritiesList = new ArrayList<>();
						authoritiesList.add(new SimpleGrantedAuthority(role));
						
						log.info("@@@@@@@@@@@@@@@@해체한 토큰 claim"+claim);
						log.info("@@@@@@@@@@@@@@@@해체한 토큰 username"+username);
						log.info("@@@@@@@@@@@@@@@@해체한 토큰 member"+member);
						log.info("@@@@@@@@@@@@@@@@해체한 토큰 authorities"+authorities);
						log.info("@@@@@@@@@@@@@@@@해체한 토큰 authorities"+authoritiesList);
						
						UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, null, authoritiesList);
						SecurityContextHolder.getContext().setAuthentication(authToken);
						filterChain.doFilter(request, response);
						
					} catch(Exception e) {

						response.setStatus(HttpServletResponse.SC_FORBIDDEN);
						response.setContentType("aplication/json;charset=utf-8");
						
						String message = "PLEASE CHECK TOKEN";
						JSONObject json = new JSONObject();
						json.put("code", "403");
						json.put("message", message);
						
						PrintWriter out = response.getWriter();
						out.print(json);
						return;
						
						
					}
					
				}else {
					log.info("@@@@@@@@@@@@@@@@토큰 검사 필요한데 Authorization 헤더 없는 경우 @@@@@@@@@@@@@@@@@@");
//					filterChain.doFilter(request, response);
					
				}	
				
				
			}//else
		}//filter - if
		
	}
	

}
