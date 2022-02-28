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
@EqualsAndHashCode(of = "rno")							//select * from tbl_free_replies where board_bno =200 order by rno DESC : sql문 실행시 생성된 인덱스사용.
@Table(name = "tbl_free_replies") //,indexes = {@Index(unique = false, columnList = "board_bno")}  //댓글은 게시글의 번호를 이용하여 인덱스 생성? 
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
