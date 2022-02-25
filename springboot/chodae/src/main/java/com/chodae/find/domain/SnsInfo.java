package com.chodae.find.domain;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString(exclude = "user")
@Getter
@Setter
@Entity
@EqualsAndHashCode(of = "sns_id")
@Table(name = "sns_info")
public class SnsInfo {
	//유저 로그 테이블
	
	@Id
	private String sns_id;
	@NotNull
	private String sns_type;
	@NotNull
	private LocalDateTime sns_condate;
	
	private String sns_name;
	private String sns_profile;
	private String sns_email;
	private String sns_contact;
	
	
	//다대일 관계 : 회원정보 테이블의 회원번호 컬럼을 외래키로. / 단방향 설정
	@ManyToOne
	@JoinColumn(name = "id")
	private User user;

}