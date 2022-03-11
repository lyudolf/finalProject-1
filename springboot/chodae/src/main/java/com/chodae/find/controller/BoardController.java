package com.chodae.find.controller;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.chodae.find.domain.Post;
import com.chodae.find.dto.PostDTO;
import com.chodae.find.service.BoardService;
import com.chodae.find.vo.PageVO;

import lombok.extern.java.Log;

@Log
@RestController
public class BoardController {

	private final BoardService boardService;
	
	
	@Autowired
	public BoardController( BoardService boardService) {
		this.boardService = boardService;
		
	}

	//전체 조회 + 검색 
	//게시글 검색 개선  페이지네이션 적용 (특정한 게시판에서 -- 제목, 내용 , 작성자 , 제목+내용,) 
	//분류 :  카테고리(지역,사용언어, 수준, 프로그램,분야:풀스택, 프론트엔드, 백엔드 ...), 평점, 
//	@GetMapping("/{boardName}/find")
	@Transactional
	@GetMapping("/{boardName}")
	Page<Post> getSearchPost(@PathVariable String boardName, PageVO pageVo,
			@RequestParam String searchType,
			@RequestParam String keyword){
		
		log.info(""+pageVo+":::"+searchType+"::::"+keyword);
		log.info(""+pageVo.makePageable(0, "postRegdate"));
		
		//url 쿼리스트링까지 모든 주소를 변수로 저장한 다음 그 뒤에다가 추천순, 댓글순, 조회순이라는 조건을 추가하는 방식?
		// 카테고리 분류 검색? 
		//평점 분류 검색? 
		
		
		Page<Post> result = boardService.searchPost(boardName, searchType, keyword,pageVo.makePageable(0, "postRegdate"));
		
		return result;	
	}
	
	//특정 게시글 조회
	@Transactional
	@GetMapping("/{boardName}/{postNo}")
	PostDTO getPost(@PathVariable String boardName,@PathVariable Long postNo){
		Post post = boardService.getPost(postNo);
		
		PostDTO dto = boardService.entityToDto(post);
	
		return dto;	
	}
	
	//게시글 추가
	@Transactional
	@PostMapping("/{boardName}")
	ResponseEntity<Long> insertPost(@PathVariable String boardName,
			@RequestParam String title,
			@RequestParam String content,
			@RequestParam String nickname,
			@RequestParam(required = false, defaultValue = "[]") String category,
			@RequestParam(required = false) MultipartFile file
			){
	
		
		log.info(""+category);
		Post post = boardService.insertPost(boardName, title, content, nickname,category);
		log.info(""+post);
		
		
		if(file != null) {
			//새로운 이미지 저장
			boardService.saveImg(file, post);
		}
		
		return new ResponseEntity<Long>(post.getPostNo(), HttpStatus.OK);	
	}
	
	//게시글 업데이트
		@Transactional
		@PutMapping("/{boardName}/{postNo}")
		ResponseEntity<Long> updatePost(@PathVariable String boardName, @PathVariable Long postNo,
				@RequestParam String title,
				@RequestParam String content,
				@RequestParam String nickname,// 닉네임은 아직 사용필요 x 
				@RequestParam String category,
				@RequestParam(required = false) MultipartFile file
				){
			
			//작성자 닉네임와 현재 로그인된 id의 닉네임이 일치할 때 업데이트? 아직
			
			
			//기존 카테고리 모두 삭제
			boardService.deleteCategoryAll(postNo);
			
			Post post = boardService.updatePost(postNo, title, content, category);
			
			
			// 기존 이미지 삭제 후 -> 새로운 이미지 저장
			if(file != null) {
				
				//기존 이미지 삭제
				boardService.deleteImg(post.getPostNo());
				
			
				//새로운 이미지 저장
				boardService.saveImg(file, post);
			}
			
			return new ResponseEntity<Long>(post.getPostNo(), HttpStatus.OK);	
		}
		
	//게시글 삭제
		@Transactional
		@DeleteMapping("/{boardName}/{postNo}/{nickname}")
		ResponseEntity<Long> deletePost(@PathVariable String boardName, @PathVariable Long postNo,
				@PathVariable String nickname){
			
			//프론트에서는 삭제가능한 버튼이 작성자 본인에게만 표시되어야 함.?
			//작성자 닉네임와 현재 로그인된 id의 닉네임이 일치할 때 업데이트는 아직
			
			Long deletedPostNo = boardService.deletePost(boardName,postNo,nickname); //게시글 삭제시 연결된 카테고리, 댓글, 게시글 내용 모두 자동 삭제됨
			
			return new ResponseEntity<Long>(deletedPostNo, HttpStatus.OK);	
		}
		
	//댓글추가
	@Transactional
	@PostMapping("/{boardName}/{postNo}/reply")
	public ResponseEntity<Long> insertReply(@PathVariable String boardName,@PathVariable Long postNo,
			@RequestParam String content,
			@RequestParam String nickname) {
			
		Long insertedpostNo = boardService.insertReply(boardName, postNo, content, nickname);
		
		return new ResponseEntity<Long>(insertedpostNo,HttpStatus.OK);
	}
	
	//댓글 수정
	@Transactional
	@PutMapping("/{boardName}/{postNo}/reply/{replyNo}")
	public ResponseEntity<Long> updateReply(@PathVariable String boardName,@PathVariable Long postNo, @PathVariable Long replyNo,
			@RequestParam String content,
			@RequestParam String nickname) {
			
		Long updatedReplyNo = boardService.updateReply(boardName, postNo, replyNo, content, nickname);
		
		return new ResponseEntity<Long>(updatedReplyNo,HttpStatus.OK); 
	}
	
	//댓글 삭제
	@Transactional
	@DeleteMapping("/{boardName}/{postNo}/reply/{replyNo}/{nickname}")
	public ResponseEntity<Long> deleteReply(@PathVariable String boardName,@PathVariable Long postNo, @PathVariable Long replyNo, 
			@PathVariable String nickname) {
			
		Long deletedReplyNo = boardService.deleteReply(boardName, postNo, replyNo, nickname);
		
		return new ResponseEntity<Long>(deletedReplyNo,HttpStatus.OK); 
	}
	
	
	//추천 작성
	//회원번호,게시판 번호, (댓글번호  or 게시글번호) 
	@Transactional
	@PostMapping("/{boardName}/recomm/{type}/{targetNo}") //type: 게시글 추천인지 댓글 추천인지, targetNo: 게시글번호, 댓글번호
	public ResponseEntity<Long> insertRecomm(@PathVariable String boardName,@PathVariable String type, @PathVariable Long targetNo,
			@RequestParam String nickname) {
			log.info(""+nickname);
		Long number = boardService.insertRecommend(boardName, nickname, type, targetNo);
		
		return new ResponseEntity<Long>(number,HttpStatus.OK); 
	}
	
	//추천 취소(삭제)
	@Transactional
	@DeleteMapping("/{boardName}/recomm/{type}/{targetNo}/{nickname}") //type: 게시글 추천인지 댓글 추천인지, targetNo: 게시글번호, 댓글번호
	public ResponseEntity<Long> deleteRecomm(@PathVariable String boardName,@PathVariable String type, @PathVariable Long targetNo,
			@PathVariable String nickname) {
			
		log.info(""+nickname+"");
		Long number = boardService.deleteRecommend(boardName, nickname, type, targetNo);
		
		return new ResponseEntity<Long>(number,HttpStatus.OK); 
	}
	
	 
	
}
