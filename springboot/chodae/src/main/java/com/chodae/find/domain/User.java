package com.chodae.find.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Entity
@Table(name = "user_info")
@Setter
public class User {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)// DB테이블 필드 이름 login_id , 중복없는 유니크 필드
	private String loginId; //로그인용 아이디
	
	@NotNull
	private String pwd;
	@NotNull
	private String name;
	@NotNull
	private String email;
	@NotNull
	private Integer level; //회원등급 
	
	@NotNull
	@Column(unique = true)
	private String nickname; //닉네임
	@NotNull
	private String status;  //유저상태
	@NotNull
	private String role;  //유저역할,권한
	@NotNull
	private LocalDateTime crdate; //  생성일자
	@NotNull
	private LocalDateTime moddate; //  수정일자
	
	private String lang;// 주로 사용하는 언어
	private String profileimg; // 프로필 이미지 
	private String phone; // 전화번호 
	private String sex; // 성별 
	private String campus; //교육기관
	private Integer test; // 테스트 점수
	

}
