package com.chodae.find5.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chodae.find.domain.Recommendation;

public interface RecommendationRepo extends JpaRepository<Recommendation, Long> {

}
