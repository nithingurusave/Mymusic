package com.example.Nithinproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Nithinproject.entity.Profile;

public interface ProfileRepository extends JpaRepository<Profile,Long> {
	Profile findByEmail(String email);
	Optional<Profile> findByLoginId(Long loginId);
}
