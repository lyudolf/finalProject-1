package com.chodae.getsend;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chodae.find.category.BoardGroup;
import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.PostContent;
import com.chodae.find.domain.Reply;
import com.chodae.find.dto.PostDTO;
import com.chodae.find.service.BoardService;
import com.chodae.find.vo.PageVO;
import com.chodae.find5.repository.PostRepo;
import com.chodae.find5.repository.RecommendationRepo;
import com.chodae.find5.repository.ReplyRepo;

import lombok.extern.java.Log;

@Log
@RestController
public class BoardController {
	
	private final PostRepo postRepo;
	private final ReplyRepo replyRepo;
	private final RecommendationRepo recomRepo;
	
	private final BoardService boardService;
	
	@Autowired
	public BoardController(PostRepo postRepo, ReplyRepo replyRepo, RecommendationRepo recomRepo, BoardService boardService) {
		super();
		this.postRepo = postRepo;
		this.replyRepo = replyRepo;
		this.recomRepo = recomRepo;
		this.boardService = boardService;
	}
	
	//게시판 전체조회
	@Transactional
	@GetMapping("/{boardName}/list")
	List<Post> getPostList(@PathVariable String boardName){
		List<Post> list = boardService.getPostList(boardName);
	
		list.forEach(post -> {
			log.info(""+post);
		});
		
		return list;	
	}
	//특정 게시글 조회
	@Transactional
	@GetMapping("/{boardName}/{postNo}")
	PostDTO getPost(@PathVariable String boardName,@PathVariable Long postNo){
		Post post = boardService.getPost(postNo);
		PostDTO dto = boardService.entityToDto(post);
		System.out.println(dto);
		return dto;	
	}
	
	//게시글 추가
	@Transactional
	@PostMapping("/{boardName}")
	ResponseEntity<Integer> insertPost(@PathVariable String boardName, Post post, @RequestParam String content){
		int boardNo = BoardGroup.valueOf(boardName).getValue();
		
		Board board = new Board();
		board.setBoardNo(boardNo);
		
		PostContent postContent = new PostContent();
		postContent.setContent(content);
		
		post.setBoard(board);
		post.setPostContent(postContent);
		System.out.println(post);
		
		post.setPostRegdate(LocalDateTime.now());
		post.setPostModdate(LocalDateTime.now());
		
		post.setReplyCount(0);
		post.setPostViews(0);
		post.setPostLike(0);
		post.setLevel(3);
		post.setPostLevel(3);
		post.setPostNotice("F");
		post.setPostComment("T");
		post.setPostDisplay("T");
		//requestparam으로 따로따로 받아야겠다.. 오류. 
		//게시판번호는 경로에서 얻고.
		//작성자, 제목, 내용, 작성일자, 수정일자, 회원등급, 게시글 등급,
		
		System.out.println(post);
		System.out.println(boardName);
		System.out.println(content);
		boardService.insertPost(post);
		
		return new ResponseEntity<Integer>(BoardGroup.valueOf(boardName).getValue(), HttpStatus.OK);	
	}
	
//	//게시글 업데이트 아직 더 테스트중
//		@Transactional
//		@PutMapping("/{boardName}/{postNo}")
//		ResponseEntity<Integer> updatePost(@PathVariable String boardName, @PathVariable Long postNo,
//				@RequestParam String title, @RequestParam String content){
//			Optional<Post> result = postRepo.findById(postNo);
			
//			if(result.isPresent()) {
//				Post post = result.get();
//				System.out.println(post);
//				post.setPostTitle(title);
//				
//				PostContent postContent = 
//				postContent.setContent(content);
//				
//				post.setPostContent(postContent);
//				
//			}
//			
//			int boardNo = BoardGroup.valueOf(boardName).getValue();
//			
//			Board board = new Board();
//			board.setBoardNo(boardNo);
//			
//			PostContent postContent = new PostContent();
//			postContent.setContent(content);
//			
//			post.setBoard(board);
//			post.setPostContent(postContent);
//			System.out.println(post);
//			
//			post.setPostRegdate(LocalDateTime.now());
//			post.setPostModdate(LocalDateTime.now());
//			
//			post.setReplyCount(0);
//			post.setPostViews(0);
//			post.setPostLike(0);
//			post.setLevel(3);
//			post.setPostLevel(3);
//			post.setPostNotice("F");
//			post.setPostComment("T");
//			post.setPostDisplay("T");
//			//requestparam으로 따로따로 받아야겠다.. 오류. 
//			//게시판번호는 경로에서 얻고.
//			//작성자, 제목, 내용, 작성일자, 수정일자, 회원등급, 게시글 등급,
//			
//			System.out.println(post);
//			System.out.println(boardName);
//			System.out.println(content);
//			boardService.insertPost(post);
//			
//			return new ResponseEntity<Integer>(BoardGroup.valueOf(boardName).getValue(), HttpStatus.OK);	
//		}

	
	
	
	
	
	
	
	
	//페이지네이션?
	//뒤에 파라미터로 page 나 size 를 추가하면 자동으로 파라미터가 수집되어서 pageable객체가 만들어진다?	 
//	@GetMapping("/{게시판}/list")  
	public void list(
			@PageableDefault(
			direction=Sort.Direction.DESC,
			sort="bno",
			size=10,
			page=0) Pageable page) {
		log.info("list() called..."+page);
	}
	
	//그런데 @pageableDefault 방식은 고의적으로 사이즈 값을 크게 주는 것을막지못하고 기타 정렬방향이나 속성역시 브라우저에서 전달되는 값을 통해서 조절할수 있기 때문에 고의적인 공격에 취약하다는 단점이 존재합니다.
	//PageVO를 만들어서 별도로 파라미터를 수집해서 처리하는 방식이 더 낫다.
	//브라우저에서 전달되는 파라미터는 자동으로 PageVO로 처리되고 컨트롤러에서 Pageable 생성
//	@GetMapping("/{게시판}/list")  
	public void list2(PageVO vo) {
		Pageable page = vo.makePageable(0, "bno");
		log.info("list2() called..."+page);// Page requet [number:0, size 10, sort: bno:DESC]
	}
	
	
	//게시물 조회리스트 화면에서는 게시물 조회후 뒤로가기 누르면 페이지 번호와 검색조건이있는 경우 조회페이지를 유지해야한다? 
	
	
//	@Transactional
//	@PostMapping("/{게시판}/{게시글번호}/reply")
	public ResponseEntity<String> insertReply(@PathVariable("") String boardName,@PathVariable("") Long postNo ) {
		
		//게시판 이름을 전달받아 enum으로 게시판 번호로 변환
		Post post = new Post(); //게시글 번호 설정 
		post.setPostNo(postNo);
		
		Reply reply = new Reply();
		
//		reply.setBoardNo(boardNo);
//		reply.setPost(post);
//		reply.setId(id);
//		reply.setReplyContent("내용");
//		reply.setReplyRegdate(replyRegdate);
//		reply.setReplyModdate(replyModdate);
//		reply.setLevel(level);
//		reply.setReplyLike(replyLike);
//		reply.setUpperReply(0);
		
		replyRepo.save(reply);
		
		return new ResponseEntity<String>("",HttpStatus.OK);
		
	}
	
	
}
