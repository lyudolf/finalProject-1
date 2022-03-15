package com.chodae.find.ex.security.filter;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.chodae.find.ex.security.jwtutil.JWTUtil;

import lombok.extern.java.Log;

@Log   //리퀘스트 헤더 Authorization 헤더 추출하여 헤더의 값이 일치하는지 확인 
public class HeaderCheckFilter extends OncePerRequestFilter{
	
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

			log.info("CheckFilter@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			log.info("CheckFilter@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			log.info("CheckFilter@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
			
			
			
			boolean checkHeader  = checkAuthHeader(request);
			
			if(checkHeader) {
				filterChain.doFilter(request, response);
				return;
				
			}
			else {
				
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				response.setContentType("aplication/json;charset=utf-8");
				
				String message = "CHECK HEADER TOKEN";
				JSONObject json = new JSONObject();
				json.put("code", "403");
				json.put("message", message);
				
				PrintWriter out = response.getWriter();
				out.print(json);
				return;
				
			}
			
		}//if
		
		
		
		filterChain.doFilter(request, response);
		
	}
	
	private boolean checkAuthHeader(HttpServletRequest request) {
		
		boolean checkResult = false;
		
		String authHeader = request.getHeader("Authorization");
		
		if(StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
			
			log.info("authorization Header exist : "+ authHeader);
			
			try {
				
			log.info("validate result  : "+ authHeader.substring(7));
			String id = jwtUtil.validateExtract(authHeader.substring(7));
			
			checkResult = id.length() > 0;
			
			} catch(Exception e) {
				
			}
		}
		
		return checkResult;
		
		
	}

}
