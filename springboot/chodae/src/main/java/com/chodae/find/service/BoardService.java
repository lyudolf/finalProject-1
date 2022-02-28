package com.chodae.find.service;

import java.util.List;

import com.chodae.find.domain.Post;
import com.chodae.find.domain.Recommendation;
import com.chodae.find.domain.Reply;
import com.chodae.find.domain.User;
import com.chodae.find.dto.PostDTO;

public interface BoardService {
//	
//	1.게시글 조회 추가 수정 삭제
//	2.댓글 조회 추가 수정 삭제 
//	3. 추천 조회 추가 수정 삭제 
//	4.이미지 리스트로 추가  => 특정 위치에 저장...?  / 조회 / 수정/ 삭제
	
	//1. 게시글 조회 추가 수정 삭제
	List<Post> getPostList(String boardName); //url주소의 board이름으로 전체 게시글 검색
	Post getPost(Long boardNo);
	
//	List<Post> getPost(String boardName,String pageNumber,int pageSize); //페이지 번호에 해당하는 게시글 검색
	
	List<Post> searchPost(String boardName, String searchType, String keyword); //검색 종류 , 검색어 
	
	Integer insertPost(Post post);
	
	Long updatePost(Post post);
	
	Long deletePost(Post post);
	
	//2. 댓글 조회 추가 수정 삭제
//	List<Reply> getReply(); //댓글조회는 게시글조회할때 조회할 수 있어서 아직은 필요가 없을 것 같음. 
	
	Long insertReply(Long postNo, Reply reply);
	Long updateReply(Long postNo, Reply reply);
	Long deleteReply(Long replyNo);
	
	//3.추천
	
	Long insertRecommend(User user, Recommendation recomm, int boardNo);
	Long deleteRecommend(Recommendation Recommendation);

	
	
	default PostDTO entityToDto(Post entity) {
		PostDTO dto = PostDTO.builder()
				.postNo(entity.getPostNo())
				.board(entity.getBoard())
				.category(entity.getCategory())
				.postTitle(entity.getPostTitle())
				.postContent(entity.getPostContent())
				.id(entity.getId())
				.replyCount(entity.getReplyCount())
				.replies(entity.getReplies())
				.postViews(entity.getPostViews())
				.postLike(entity.getPostLike())
				.postRegdate(entity.getPostRegdate())
				.postModdate(entity.getPostModdate())
				.level(entity.getLevel())
				.postLevel(entity.getPostLevel())
				.postNotice(entity.getPostNotice())
				.postComment(entity.getPostComment())
				.postDisplay(entity.getPostDisplay())
				.build();
		
		return dto;
	}



	
	
	
	

}
