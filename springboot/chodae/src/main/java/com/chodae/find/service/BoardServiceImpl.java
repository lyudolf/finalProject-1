package com.chodae.find.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chodae.find.category.BoardGroup;
import com.chodae.find.controller.FindController;
import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.Recommendation;
import com.chodae.find.domain.Reply;
import com.chodae.find.domain.User;
import com.chodae.find5.repository.PostRepo;
import com.chodae.find5.repository.RecommendationRepo;
import com.chodae.find5.repository.ReplyRepo;

import lombok.extern.java.Log;

@Log
@Service
public class BoardServiceImpl implements BoardService {
	
	private final PostRepo postRepo;
	
	private final ReplyRepo replyRepo;
	
	private final RecommendationRepo recommRepo;
	
	
	
	@Autowired
	public BoardServiceImpl(PostRepo postRepo,ReplyRepo replyRepo,RecommendationRepo recommRepo) {
		this.postRepo = postRepo;
		this.replyRepo = replyRepo;
		this.recommRepo = recommRepo;
	}

	@Override
	public List<Post> getPostList(String boardName) {
		System.out.println(BoardGroup.valueOf(boardName).getValue());
		List<Post> list = postRepo.findPostByBoard(BoardGroup.valueOf(boardName).getValue());
		return list;
	}
	
	@Override
	public Post getPost(Long boardNo) {
		return postRepo.findById(boardNo).get();
	}
	

	@Override  //검색 아직.
	public List<Post> searchPost(String boardName, String searchType, String keyword) {
		// type : 제목 title, 내용 content, 작성자 writer 
		// 타입과 키워드에 맞춰서 메소드 호출
		return null;
	}

	@Override
	public Integer insertPost(Post post) {
		
		postRepo.save(post); //카테고리도 잘 추가되나 확인
		
		return post.getBoard().getBoardNo(); //추가된 게시판번호 반환 
		 
	}

	@Override
	public Long updatePost(Post post) {
		Long postNo = post.getPostNo();
		
		Optional<Post> postEntity =  postRepo.findById(post.getPostNo());
		
		postEntity.ifPresent(postInfo -> {
			postRepo.save(post);
		});
		
		return postNo;
		
	}

	@Override
	public Long deletePost(Post post) {
		Long postNo = post.getPostNo();
	
		Optional<Post> postEntity =  postRepo.findById(post.getPostNo());
		
		postEntity.ifPresent(postInfo -> {
			postRepo.deleteById(postInfo.getPostNo());
		});
		return postNo;
	}
	
	@Transactional
	@Override
	public Long insertReply(Long postNo, Reply reply) {
		
		
		Optional<Post> post =  postRepo.findById(postNo);
		post.ifPresent(postInfo -> {
			
			postInfo.setReplyCount(postInfo.getReplyCount()+1);
			
			
			// 컨트롤러에서 작성후 넘겨주면
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
			replyRepo.save(reply);
			
		});
		return postNo;
	}

	@Override
	public Long updateReply(Long postNo, Reply reply) {
		Optional<Post> post =  postRepo.findById(postNo);
		post.ifPresent(postInfo -> {
			
			postInfo.setReplyCount(postInfo.getReplyCount()+1);
			
			
			// 컨트롤러에서 작성후 넘겨주면
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
			replyRepo.save(reply);
			
		});
		return postNo;
	}

	@Override
	public Long deleteReply(Long replyNo) {
		Optional<Reply> reply =  replyRepo.findById(replyNo);
		reply.ifPresent(replyInfo -> {
			replyRepo.deleteById(replyInfo.getReplyNo());
		});
		return replyNo;
	}

	@Override
	public Long insertRecommend(User user, Recommendation recomm, int boardNo) {
		// 공통 : 회원번호, 게시판 번호
		//댓글 추천시 댓글번호           
		// 게시글 추천시 게시글번호
		Long num = -1L;
		if(recomm.getReply() != null) {
			//댓글 추천 여부 확인 후  저장
			Optional<Recommendation> recom = recommRepo.existReplyRecomm(user.getId(), recomm.getReply().getReplyNo());

			if(!recom.isPresent()) {
				// 해당 댓글 추천수 증가
				Optional<Reply> reply =  replyRepo.findById(recomm.getReply().getReplyNo());
				reply.ifPresent(replyInfo -> {
					replyInfo.setReplyLike(replyInfo.getReplyLike()+1);
				});
				
				recommRepo.save(recomm);
				num = recomm.getReply().getReplyNo();				
			}
		
		}else {
			//게시글 추천 여부 확인 후 저장
			Optional<Recommendation> recom = recommRepo.existPostRecomm(user.getId(), recomm.getPost().getPostNo());
			
			
			if(!recom.isPresent()) {
				//게시글 추천수 증가 
				Optional<Post> post =  postRepo.findById(recomm.getPost().getPostNo());
				post.ifPresent(postInfo -> {
					postInfo.setPostLike(postInfo.getPostLike()+1);
				});
				
				
				recommRepo.save(recomm);
				num = recomm.getPost().getPostNo();				
			}
		}
		
		return num;//추천된 게시글번호 또는 댓글 번호 반환 
	}

	

	@Override
	public Long deleteRecommend(Recommendation recommendation) {
		// 이미 자신이 추천한 게시글이나 댓글을 대상으로 실행한다. 
		// 추천번호로 추천삭제 ? 아직 감이 안온다. 
//		Optional<Recommendation> recom = recommRepo.findById(id);
//		Optional<Recommendation> recom = recommRepo.existPostRecomm(user.getId(), recomm.getPost().getPostNo());
		//해당 댓글, 게시글 추천수 감소
		
		return 0L;//삭제된 추천번호 반환 
	}

}
