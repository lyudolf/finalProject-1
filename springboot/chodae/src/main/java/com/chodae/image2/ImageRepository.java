package com.chodae.image2;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface ImageRepository extends JpaRepository<Image2, Long> {
	
	
	@Query("SELECT i FROM Image i WHERE i.post.postNo = ?1")
	List<Image2> findByPostNo(Long postNo);

	Optional<Image2> findByfilename(String fileName);





	
}
