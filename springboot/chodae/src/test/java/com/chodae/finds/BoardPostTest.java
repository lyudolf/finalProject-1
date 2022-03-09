package com.chodae.finds;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;

import javax.swing.text.AbstractDocument.Content;
import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chodae.find.category.BoardGroup;
import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.PostContent;
import com.chodae.find.domain.Reply;
import com.chodae.find5.repository.BoardRepo;
import com.chodae.find5.repository.PostRepo;
import com.chodae.find5.repository.ReplyRepo;
import com.chodae.getsend.domain.Ppp;

import lombok.extern.java.Log;




@Commit
@Log
@ExtendWith(SpringExtension.class)
@SpringBootTest
public class BoardPostTest {
	
	@Autowired
	BoardRepo boardRepo;
	
	@Autowired
	PostRepo postRepo;
	
	@Autowired
	ReplyRepo replyRepo;
	
	@Transactional
	@Test
	public void selectPostByBoard() {
		Board board = new Board();
		board.setBoardNo(1);
		List<Post> list = postRepo.findPostByBoard(board);
		list.forEach(post -> log.info(""+post));
	}
	@Transactional
	@Test
	public void selectPostByBoardNo() {
		
		List<Post> list = postRepo.findPostByBoard(1);
		list.forEach(post -> log.info(""+post));
	}
	
	/////////////////////////////////////////////////////////
	
	
	@Transactional
	@Test
	public void selectPostByBoard3() {
		
		List<Post> list = postRepo.findPost3(1);
		list.forEach(post -> log.info(""+post.getPostNo()+post.getReplies()));
	}
	@Transactional
	@Test
	public void selectPostCount4() {
		
		List<Object[]> list = postRepo.getPostCountByWriter(200L);
		list.forEach(post -> System.out.println(Arrays.toString(post)));
	}
	
	
	
	@Transactional
	@Test
	public void insertBoardAll() {   //1. 게시판 그룹 세팅
		
//		log.info("열거형테스트를 시작합니다.");
//		
//		log.info(BoardGroup.공지사항.name());
//		log.info(String.valueOf( (BoardGroup.공지사항.name()=="공지사항")));
//		
//		log.info( BoardGroup.valueOf("공지사항").name());
//		System.out.println( BoardGroup.valueOf("공지사항").getValue());
//		
////		log.info(String.valueOf(BoardGroup.스터디모집.ordinal()) ); //기본순서
//		
////		BoardGroup[] board = BoardGroup.values();
////		log.info(Arrays.toString(board));
//		
//		System.out.println(BoardGroup.스터디모집.getValue());
//		
//		BoardGroup b2o = BoardGroup.valueOf(BoardGroup.class, "스터디모집");
//		BoardGroup b3o = BoardGroup.스터디모집;
//		System.out.println("b2==b3: "+ (b2o==b3o));
		
		//열거형 클래스를 한번에 리스트로 데이터베이스에 저장함. 기본키는 열거형상수의 값으로 지정. 
		
		List<Board> list = new ArrayList<Board>();
		BoardGroup[] arr = BoardGroup.values();
		
		for (BoardGroup bg : arr) {
			System.out.printf("%s=%d,", bg.name(), bg.getValue());
			
			Board board = new Board();
			board.setBoardNo(bg.getValue());
			board.setBoardName(bg.name());
			board.setBoardWriter(200L);
			board.setBoardCategory("게시판의 카테고리");
			board.setBoardDate(LocalDateTime.now());
			board.setBoardOrder("게시판순서?");
			board.setBoardStatus("T");
			
			list.add(board);
			
		}
		
		
		List<Board> list2 = boardRepo.saveAll(list);
		System.out.println("통과됨");
		for (Board b : list2) {
			System.out.println(b.toString());
			
		}
		
		//System.out.println( BoardGroup.valueOf("공지사항").getValue());  //게시판이름으로 게시판번호 연결
		
//		IntStream.range(1, 200).forEach(i -> {
//			
//			
//		});
	}
	
	
	
	Long id = 200L;
	String title = "제목";
	Integer level = 5;
	Integer postLevel = 5;
	
	
	String postNotice = "F";//공지사항여부
	String postComment="T";//댓글사항 여부 
	String postDisplay="T";// 게시 여부
	

	

	//2. 게시글 데이터 세팅
	@Transactional
	@Test
	public void insertPost() {
		
		//Post 데이터는 반드시 Board 객체에 대한 참조가 필요하다.(외래키로 게시판 번호 필요) 
		//Board 객체를 잠시 생성해서  외래키로 사용되는 board_no 속성만 설정해주는게 더 효율적.  
		Board board = new Board();
		board.setBoardNo(BoardGroup.faq.getValue()); //ex> 공지사항 게시판에서 글을 쑈고 저장시
		
		IntStream.range(1, 20).forEach(i -> {
			Post post = new Post();
			
			post.setBoard(board); //공지사항 게시판번호 저장
			
			PostContent postContent = new PostContent();
			postContent.setContent("게시글 내용"+i);
			post.setPostContent(postContent);
			
			post.setPostTitle(title+i);
			post.setId(201L);
			post.setPostViews(0);
			post.setLevel(5);
			post.setPostLevel(5);
			post.setReplyCount(0);
			post.setPostLike(0);
			post.setPostRegdate(LocalDateTime.now());
			post.setPostModdate(LocalDateTime.now());
			post.setPostNotice("F");
			post.setPostDisplay("T");
			post.setPostComment("T");
			
			postRepo.save(post);
			
		});
	}
	
	//게시글 조회 
	@Test
	@Transactional //지연로딩
	public void selectPosts() {
		
		List<Post> list = postRepo.findAll();
		list.forEach(post -> {
			//댓글수 필드는 없어도 될려나...? 
			System.out.println(post);
			log.info("글번호:"+post.getPostNo()+"내용번호"+post.getPostContent().getContentNo()+"댓글갯수:"+post.getReplies().size()+":카테고리개수="+post.getCategory().size()+","+post.getPostTitle()+","+post.getReplyCount()+post.getReplies());
		});
	}
	
	//댓글저장  그리고 게시글 조회시 댓글수 조회되나 확인
	
	@Test
	@Transactional //지연로딩
	public void insertReply() {
		//댓글만 저장한다면?  => 된다. 게시글에서도 댓글리스트에 반영되어있음.
		
		//1. 게시글의 번호만 필요, 해당 게시글 번호를 직접 설정해서 댓글 저장.
//		Post post = new Post();
//		post.setPostNo(1L);
//		
//		Reply reply = new Reply();
//		reply.setPost(post);
//		reply.setBoardNo(1);
//		reply.setReplyContent("댓글내용");
//		reply.setReplyRegdate(LocalDateTime.now());
//		reply.setReplyModdate( LocalDateTime.now()  );
//		reply.setId(51L);
//		reply.setReplyLike(0);
//		reply.setLevel(5);
//		reply.setUpperReply(0);
//		replyRepo.save(reply);
		
		
		//2. 1번 방법으로는 댓글수 증가를 할 수가 없음. 달린 댓글수를 증가시키기 위해서 진짜 게시글 객체를  찾아서 불러옴.
		//2번 방법이 간편한 것 같음.
		
//		Optional<Post> post =  postRepo.findById(1L);
//		post.ifPresent(postInfo -> {
//			
//			
//			
//			
//			Reply reply = new Reply();
//			reply.setPost(postInfo);
//			reply.setBoardNo(1);
//			reply.setReplyContent("2번방법");
//			reply.setReplyRegdate(LocalDateTime.now());
//			reply.setReplyModdate( LocalDateTime.now()  );
//			reply.setId(51L);
//			reply.setReplyLike(0);
//			reply.setLevel(5);
//			reply.setUpperReply(0);
//			replyRepo.save(reply);
//			System.out.println("@@@@@@@@ "+postInfo);
//			postInfo.setReplyCount(postInfo.getReplyCount()+1);
//		});
		
		//3. 양방향 관계설정이니까 게시판을 불러와서 게시판 댓글리스트 자체에 댓글을 add 한 후에 게시판을 저장하는 방식도 된다. 
		
		Optional<Post> post =  postRepo.findById(100L);
		post.ifPresent(postInfo -> {
			
			List<Reply> list = postInfo.getReplies();
			
			
			
			Reply reply = new Reply();
			reply.setPost(postInfo);
			reply.setBoardNo(BoardGroup.faq.getValue());
			reply.setReplyContent("댓글내용이에요");
			reply.setReplyRegdate(LocalDateTime.now());
			reply.setReplyModdate( LocalDateTime.now()  );
			reply.setId(51L);
			reply.setReplyLike(0);
			reply.setLevel(5);
			reply.setUpperReply(0);
//			replyRepo.save(reply);
			
			//댓글리스트에 add 후에 리스트와 함꼐 게시판 자체를 저장.
			list.add(reply);
			postInfo.setReplies(list);
			postRepo.save(postInfo);
			
			
			System.out.println("@@@@@@@@ "+postInfo);
			postInfo.setReplyCount(postInfo.getReplyCount()+1); //세이브 뒤에서 써도 왜 이렇게 해도 댓글수가 증가하지?
		});
		
		
	}
	
	
	//조회하면 =>  게시글에 반영
	//추천기록 =>저장 후 => 게시글 반영
	
	
		
	

}
