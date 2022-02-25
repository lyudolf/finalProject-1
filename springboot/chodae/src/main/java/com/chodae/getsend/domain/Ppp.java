package com.chodae.getsend.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(exclude = "replies")
//@EqualsAndHashCode(of = "post_no")
//@Table(name = "post_info")
@EqualsAndHashCode(of = "bno")
@Table(name = "tbl_freeboards")
public class Ppp {
//게시글
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long bno;
	private String title;
	private String writer;
	private String content;
	
//	@Fetch(FetchMode.SUBSELECT)
	@OneToMany(mappedBy = "board",cascade = CascadeType.ALL)
	private List<Iuuu> replies = new ArrayList<Iuuu>();

	
}
