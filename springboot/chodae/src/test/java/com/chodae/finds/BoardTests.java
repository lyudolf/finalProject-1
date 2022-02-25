package com.chodae.finds;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.find.repository.FreeBoardRepository;
import com.chodae.find.repository.ReplyRepository;
import com.chodae.getsend.domain.Iuuu;
import com.chodae.getsend.domain.Ppp;

import lombok.extern.java.Log;

@Commit
@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BoardTests {
	
	@Autowired
	FreeBoardRepository boardRepo;
	
	@Autowired
	ReplyRepository replyRepo;
	
	@Test
	public void insertBoard() {
		IntStream.range(1, 200).forEach(i -> {
			
			Ppp post = new Ppp();
			post.setTitle("제목"+i);
			post.setWriter("글쓴이"+i%10);
			post.setContent("내용"+i);
			boardRepo.save(post);
		});
	}
	
	@Test
	@Transactional
	public void insertReply() {
		//양방향 연결식 댓글 추가 : 게시글 객체를 얻어온후 , 게시글 객체의 댓글리스트에 새로운 댓글을 추가 한 후에 게시글 자체를 저장
		Optional<Ppp> result =boardRepo.findById(199L);
		System.out.println(result.get().toString());
		
		result.ifPresent(board -> {
			List<Iuuu> replies = board.getReplies();
			
			String result3 = "";
			for(Iuuu str : replies) {

				result3 += str.toString();

			}
			System.out.println(result3);

			
			Iuuu reply = new Iuuu();
			reply.setReply("댓글내용");
			reply.setReplyer("댓글작성자");
			reply.setBoard(board);
			
			replies.add(reply);
			
			String result4 = "";
			for(Iuuu str : replies) {

				result4 += str.toString();

			}
			System.out.println(result4);
			
			board.setReplies(replies);
			
			boardRepo.save(board);
			Optional<Ppp> result1 = boardRepo.findById(199L);
			System.out.println(result1.get().toString());
			
		});
		
		
	}
	
	@Test
	public void insertReply1way() {
		//댓글객체를 생성하고 , 게시글 객체 새로 생성해서 게시글 번호 속성만을 지정하여  최종적으로 댓글 저장.
		
		Ppp post = new Ppp();
		post.setBno(199L);
		
		Iuuu reply = new Iuuu();
		reply.setReply("단방향추가댓글내용");
		reply.setReplyer("단방향댓글추가자");
		reply.setBoard(post);
		
		replyRepo.save(reply);
		
		
	}
	
	@Test
	public void testList() {
		Pageable page = PageRequest.of(0, 10,Sort.Direction.DESC,"bno");
		
		boardRepo.findByBnoGreaterThan(0L, page).forEach(board -> {
			log.info(board.getBno()+":"+board.getTitle());
		});
	}
	
	
	@Test
	public void testList2() {
		//에러발생: JPA는 정보가 필요하기 전까지는  최대한 테이블에 접근하지 않는 방식을 사용(지연로딩) 
		//즉시로딩 (@ONETOMANY(fetch=FetchType.EAGER))을 이용 : 해당 엔티티 조정
		//실행해보면 아직 동일한 sql쿼리문 반복되는 모습 확인됨.(페이지 게시글 목록 조회 select + 10번의 댓글조회 select)
		Pageable page = PageRequest.of(0, 10,Sort.Direction.DESC,"bno");
		
		boardRepo.findByBnoGreaterThan(0L, page).forEach(board -> {
			log.info(board.getBno()+":"+board.getTitle()+":::"+board.getReplies().size());
		});
	}
	@Transactional
	@Test
	public void testList3() {
		//에러발생: JPA는 정보가 필요하기 전까지는  최대한 테이블에 접근하지 않는 방식을 사용(지연로딩) 
		//지연로딩을 이용하면서(기본값 지연로딩 ONETOMANY(fetch=FetchType.LAZY)) 하려면 @Transctional을 이용해서 처리해야함.
		//실행해보면 아직 동일한 sql쿼리문 반복되는 모습 확인됨.(페이지 게시글 목록 조회 select + 10번의 댓글조회 select)
		Pageable page = PageRequest.of(0, 10,Sort.Direction.DESC,"bno");
		
		boardRepo.findByBnoGreaterThan(0L, page).forEach(board -> {
			log.info(board.getBno()+":"+board.getTitle()+":::"+board.getReplies().size());
		});
	}
//	
//	//그렇다면? 지연로딩의 문제를 해결하기 좋은 방법은 @Query를 이용해서 조인처리를 하는 것이다.
//	@Test
//	public void testList4() {
//		//@Query를 이용 조인처리 sql문 직접 수행. 한번에 리스트를 가져온다.
//		Pageable page = PageRequest.of(0, 10,Sort.Direction.DESC,"bno");
//		
//		boardRepo.getPage(page).forEach(arr -> {
//			log.info(Arrays.toString(arr));
//		});
//	}
	
	//개선: 지연로딩을 이용하되, 댓글쪽에서는 필요한 순간에 데이터를 더 빠르게 검색할수 있게 하는 방법? 
	// -> 댓글목록의 경우는 특정한 게시글 번호에 영향을 받기 때문에 게시글번호에 대한 인덱스를 생성하는 방법이 있다고 한다... 
	
	
	

}
