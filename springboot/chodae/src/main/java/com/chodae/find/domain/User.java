package com.chodae.find.domain;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Entity
@Table(name = "user_info")
@Setter
@DynamicInsert
@DynamicUpdate
public class User {
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)// DB테이블 필드 이름 login_id , 중복없는 유니크 필드
	private String loginId; //로그인용 아이디
	
	@NotNull
	private String password;
	@NotNull
	private String name;
	@NotNull
	private String email;
	
	
	@Column(columnDefinition = "integer default 1")
	private Integer level; //회원등급 
	
	@NotNull
	@Column(unique = true)
	private String nickname; //닉네임
	

	private String status;  //유저상태
	
	
	@Column(columnDefinition = "varchar(50) default 'normal'")
	private String role;  //유저역할,권한
	
	
	private String language;// 주로 사용하는 언어
	private int phone; // 전화번호 
	private String mailAds; 
	private String campus; //교육기관
	//private Integer test; // 테스트 점수
	//private String profileimg; // 프로필 이미지 
	
	@CreationTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "create_date")
	private Date createDate;
	
	@UpdateTimestamp
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "modify_date")
	private Date modifyDate;
}
