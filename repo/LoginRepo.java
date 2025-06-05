package com.example.Nithinproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Nithinproject.entity.Login;

public interface LoginRepo extends JpaRepository<Login,Long> {
	Login findByEmail(String email);

}
