package com.chodae.find.domain;

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

@ToString//(exclude = {"post","reply","user"})
@Getter
@Setter
@Entity
@Table(name = "recommendations")
public class Recommendation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "reco_no")
	private Long recoNo;
	
	@ManyToOne
	@JoinColumn(name = "id")
	private User user;//회원번호 외래키 다대일관계     
	
	
	@ManyToOne
	@JoinColumn(name = "reply_no")
	private Reply reply;//댓글번호 외래키  다대일관계
	
	@ManyToOne
	@JoinColumn(name = "post_no")
	private Post post;//게시글 번호 외래키 다대일관계
 	
 	private Integer boardNo; //게시판 번호 외래키    //다대일로 설정하려니 애매하다.  생각중. 관계설정안하는게 나을수도? 관계설정없이 필드만 만들어놓는게 나을 것 같다. 어짜피 저장시 설정가능
	
}
