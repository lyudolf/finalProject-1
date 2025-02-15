package com.chodae.find5.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.chodae.find.domain.Category;


public interface CategoryRepo extends JpaRepository<Category, Long>{
	
	@Query("SELECT c FROM Category c WHERE c.post.postNo = ?1")
	List<Category> findByPostNo(Long postNo);

}
