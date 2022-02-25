package com.chodae.find5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.find.domain.Post;

public interface PostRepo  extends JpaRepository<Post, Long>{

}
