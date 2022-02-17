package com.chodae.getsend;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Entity
@Table(name = "user_info")
@Setter
public class User {
	
	@Id @GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	private String pwd;
	private String name;
	
	private LocalDateTime crdate; //  생성일자
	

}
//`id`          INT             NOT NULL    COMMENT '회원번호', 
//`pwd`         VARCHAR(45)     NOT NULL    COMMENT '비밀번호', 
//`name`        VARCHAR(45)     NULL        COMMENT '이름', 
//`email`       VARCHAR(100)    NOT NULL    COMMENT '이메일', 
//`sex`         VARCHAR(1)      NULL        COMMENT '성별', 
//`phone`       VARCHAR(20)     NULL        COMMENT '전화번호', 
//`level`       INT             NOT NULL    COMMENT '회원등급', 
//`nickname`    VARCHAR(60)     NOT NULL    COMMENT '닉네임', 
//`lang`        VARCHAR(45)     NULL        COMMENT '언어', 
//`status`      CHAR(1)         NOT NULL    COMMENT '유저상태', 
//`role`        VARCHAR(45)     NOT NULL    COMMENT '유저역할', 
//`profileimg`  VARCHAR(255)    NULL        COMMENT '프로필사진', 
//`crdate`      DATETIME        NOT NULL    COMMENT '생성날짜', 
//`moddate`     DATETIME        NOT NULL    COMMENT '수정날짜', 
//`campus`      VARCHAR(45)     NULL        COMMENT '교육기관', 
//`test`        INT             NULL        COMMENT '테스트점수', 