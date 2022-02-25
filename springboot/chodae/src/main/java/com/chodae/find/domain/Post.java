package com.chodae.find.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString(exclude = "replies" )
@Getter
@Entity
@Table(name = "post_info")
@Setter
public class Post {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "post_no")
	private Long postNo;//게시글 번호
	
	@ManyToOne
	@JoinColumn(name = "board_no")
	private Board board;//게시판 번호(외래키)
	
	@OneToOne(cascade = CascadeType.ALL)  //케스케이드 옵션을 설정하지 않으면 오류가 발생한다.
	@JoinColumn(name = "content_no")
	private PostContent postContent; //게시글 내용 : 1대1 관계 (게시글 내용 테이블의 기본키와 연결)    1 대 1 단방향만 연결설정함. 
	
	private Long id;//작성자 
	private String postTitle;//제목
	private Integer replyCount;//이 게시글에 달린 댓글수
	private Integer postViews;// 조회수
	private Integer postLike;// 추천수
	private LocalDateTime postRegdate;//작성일자
	private LocalDateTime postModdate;//수정일자
	
//	private String postKind;// 게시글 카테고리 , 카테고리 구조변경으로삭제

//	private String campCategory;//기관 카테고리? 
	private Integer level;  //회원 등급 
	private Integer postLevel; //게시글 등급
	
	private String postNotice;//공지사항여부
	private String postComment;//댓글사항 여부 
	private String postDisplay;// 게시 여부
	
	//mappedBy로 설정된 컬럼은 db 테이블 구조에 영향을 주지 않는다.  
	//댓글과의 일 대 다 관계, 주인키는 아님. 
	//@Fetch(FetchMode.SUBSELECT)
	@OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
	private List<Reply> replies = new ArrayList<Reply>();
	
	//카테고리와 일 대 다 관계, 주인키는 아님. 
	//@Fetch(FetchMode.SUBSELECT)
	@OneToMany(mappedBy = "post",cascade = CascadeType.ALL)
	private List<Category> category = new ArrayList<Category>();

}
