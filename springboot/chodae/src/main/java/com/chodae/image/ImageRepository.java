package com.chodae.image;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ImageRepository extends JpaRepository<Image, Long> {
	
	Optional<Image> findByName(String name);
	
	@Query("SELECT i FROM Image i WHERE i.post.postNo = ?1")
	List<Image> findByPostNo(Long postNo);
}
