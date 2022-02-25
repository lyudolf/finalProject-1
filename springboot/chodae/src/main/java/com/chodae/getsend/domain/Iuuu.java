package com.chodae.getsend.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@EqualsAndHashCode(of = "rno")
@Table(name = "tbl_free_replies") //,indexes = {@Index(unique = false, columnList = "board_bno")}
public class Iuuu {
// 이미지 파일 첨부 
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long rno;
	
	private String reply;
	private String replyer;
	
	@JoinColumn(name = "bno")
	@ManyToOne
	private Ppp board;
}
