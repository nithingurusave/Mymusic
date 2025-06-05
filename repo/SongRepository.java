package com.example.Nithinproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Nithinproject.entity.Songs;

public interface SongRepository extends JpaRepository<Songs,Long>{
	public Songs findByTitle(String title);
}
