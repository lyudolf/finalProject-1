package com.chodae.find.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.chodae.find.domain.Board;
import com.chodae.find.domain.Category;
import com.chodae.find.domain.PostContent;
import com.chodae.find.domain.Reply;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class PostDTO {
	//포스트 내용이 엔티티 객체를 넘기면 안넘어가서 따로 dto로 설정해줘야되나보다
	
	private Long postNo;//게시글 번호
	private Board board;//게시판 번호(외래키)
	private PostContent postContent; 
	private Long id;//작성자 
	private String postTitle;//제목
	private Integer replyCount;//이 게시글에 달린 댓글수
	private Integer postViews;// 조회수
	private Integer postLike;// 추천수
	private LocalDateTime postRegdate;//작성일자
	private LocalDateTime postModdate;//수정일자
	private Integer level;  //회원 등급 
	private Integer postLevel; //게시글 등급
	
	private String postNotice;//공지사항여부
	private String postComment;//댓글사항 여부 
	private String postDisplay;// 게시 여부
	private List<Reply> replies;
	private List<Category> category;
	
}
