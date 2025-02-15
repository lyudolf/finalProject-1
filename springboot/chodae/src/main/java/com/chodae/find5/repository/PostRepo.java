package com.chodae.find5.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;
import com.chodae.find.domain.Reply;

public interface PostRepo  extends JpaRepository<Post, Long>{
	
	List<Post> findPostByBoard(Board board);
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1")
	List<Post> findPostByBoard(int boardNo);
	
	@Query("SELECT p FROM Post p left join p.board b WHERE p.board.boardNo = :boardNo")
	List<Post> findPost3(@Param("boardNo") int boardNo);
	
	@Query("SELECT p.id, count(u) FROM Post p left outer join User u on u.id = p.id WHERE p.id = ?1 GROUP BY u")
	List<Object[]> getPostCountByWriter(Long id);
	
	///////////////////////테스트중 /////////////////////////////////////////
	
	//페이징 처리와 정렬 : 모든 쿼리메소드의 마지막 파라미터로 Pageable 인터페이스와 sort인터페이스 사용가능 
	//반환타입 : Slice 타입, Page 타입 , List 타입 이용 
//	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1")
//	List<Post> findPostByBoard2(int boardNo, Pageable paging);
		
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1")
	Page<Post> findPostByBoardAndPage(int boardNo, Pageable paging);

		
	/////////////////////////////////////////////////////////////////////////
	
	//게시글 검색
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1 and p.postTitle Like %?2% ")
	Page<Post> getPostLikeTitle(int boardNo, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1 and p.postContent.content Like %?2% ")
	Page<Post> getPostLikeContent(int boardNo, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1 and (p.postTitle Like %?2% OR p.postContent.content Like %?2% ) ")
	Page<Post> getPostLikeTitleOrContent(int boardNo, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1 and p.id = ?2 ")
	Page<Post> getPostFromWriter(int boardNo, Long id, Pageable paging);
	
	@Query("SELECT p FROM Post p left join p.category c where c.categoryName= ?2 and p.board.boardNo= ?1")
	Page<Post> getPostLikeLocation(int boardNo, String keyword, Pageable paging);
	
	
	//리뷰 게시판 인덱스로 특정 게시글 찾기
	@Query("SELECT p FROM Post p left join p.category c WHERE c.categoryKind = ?1 and c.categoryName = ?2")
	Optional<Post> findCateKindAndName(String Kind, String Name);
	
	
	//나의 게시글
	@Query("SELECT p FROM Post p WHERE p.id = ?1")
	Page<Post> findMyPostById(Long id, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.id = ?1 and p.postTitle Like %?2% ")
	Page<Post> getMyPostLikeTitle(Long id, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.id = ?1 and p.postContent.content Like %?2% ")
	Page<Post> getMyPostLikeContent(Long id, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p WHERE p.id = ?1 and (p.postTitle Like %?2% OR p.postContent.content Like %?2% ) ")
	Page<Post> getMyPostLikeTitleOrContent(Long id, String keyword, Pageable paging);
	
	@Query("SELECT p FROM Post p left join p.category c where c.categoryName= ?2 and p.id = ?1")
	Page<Post> getMyPostLikeLocation(Long id, String keyword, Pageable paging);
	
	// 나의 댓글(닉네임 + 댓글내용 + 게시글제목 + 댓글번호 + 게시판번호 + 게시글 번호+ 작성날짜 + 추천수) 
//	@Query("SELECT r, p.postTitle, p.board.boardNo, p.postNo FROM Reply r left join r.post p WHERE r.id = ?1 and r.replyContent Like %?2% ")
//	@Query("SELECT r FROM Reply r left join r.post p WHERE r.id = ?1 and r.replyContent Like %?2% ")
	@Query("SELECT r FROM Reply r WHERE r.id = ?1 and r.replyContent Like %?2% ")
	Page<Reply> getMyReplyLikeContent(Long id, String keyword, Pageable paging);
	
	@Query("SELECT r FROM Reply r WHERE r.id = ?1")
	Page<Reply> getMyReplyById(Long id, Pageable paging);
	
	
}
