package com.chodae.find5.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chodae.find.domain.Recommendation;

public interface RecommendationRepo extends JpaRepository<Recommendation, Long> {
	
	//해당 게시글에 대한 추천 존재 여부 확인 
	@Query("SELECT r FROM Recommendation r WHERE r.user.id = ?1 and r.post.postNo = ?2 ")
	Optional<Recommendation> existPostRecomm(Long id, Long postNo);

	//해당 댓글에 대한 추천 존재 여부 확인 
	@Query("SELECT r FROM Recommendation r WHERE r.user.id = ?1 and r.reply.replyNo = ?2 ")
	Optional<Recommendation> existReplyRecomm(Long id, Long replyNo);
	
	
	
}
