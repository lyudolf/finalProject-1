package com.chodae.find5.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.chodae.find.domain.Board;
import com.chodae.find.domain.Post;

public interface PostRepo  extends JpaRepository<Post, Long>{
	
	List<Post> findPostByBoard(Board board);
	
	@Query("SELECT p FROM Post p WHERE p.board.boardNo = ?1")
	List<Post> findPostByBoard(int boardNo);
	
	@Query("SELECT p FROM Post p left join p.board b WHERE p.board.boardNo = :boardNo")
	List<Post> findPost3(@Param("boardNo") int boardNo);
	
	@Query("SELECT p.id, count(u) FROM Post p left outer join User u on u.id = p.id WHERE p.id = ?1 GROUP BY u")
	List<Object[]> getPostCountByWriter(Long id);

}
