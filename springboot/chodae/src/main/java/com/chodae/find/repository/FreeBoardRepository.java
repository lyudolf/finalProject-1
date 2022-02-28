package com.chodae.find.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chodae.getsend.domain.Ppp;

public interface FreeBoardRepository extends JpaRepository<Ppp, Long>{
//게시글라포지토리
	
	List<Ppp> findByBnoGreaterThan(Long bno, Pageable page);
	
//	@Query("SELECT b.bno,b.title, count(r) FROM PostInfo b LEFT OUTER JOIN b.replies r WHERE b.bno > 0 GROUP BY b")   //=> 추가로 도메인에 인덱스 처리.
//	List<Object[]> getPage(Pageable page);
	
	
}
