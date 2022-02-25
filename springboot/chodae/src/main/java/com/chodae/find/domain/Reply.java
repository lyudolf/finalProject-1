package com.chodae.find.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString(exclude = "post")
@Getter
@Setter
@Entity
@Table(name = "reply_info")
public class Reply {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reply_no")
	private Long replyNo;//댓글 번호
	
	@ManyToOne
	@JoinColumn(name = "post_no")
	private Post post;//게시글번호 외래키 
	
	private Integer boardNo;//게시판번호 (외래키로 정할지는 아직 보류중)
	
	private String replyContent;//댓글내용
	private LocalDateTime replyRegdate;//작성일자
	private LocalDateTime replyModdate;//수정일자
	private Long id; //작성회원번호
	private Integer replyLike; //추천수
	private Integer level; //회원등급
	
	private Integer upperReply;//상위 댓글번호    = 아직 미구현으로 관계설정해주지 않음.
	
	
	
}
