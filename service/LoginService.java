package com.example.Nithinproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Nithinproject.entity.Login;
import com.example.Nithinproject.entity.Profile;
import com.example.Nithinproject.repository.LoginRepo;
import com.example.Nithinproject.repository.ProfileRepository;
@Service
public class LoginService {

	@Autowired
	LoginRepo loginrepository;
	@Autowired
	ProfileRepository profilerepository;
	@Autowired
	FavoritesService favoriteService;
	
	public String registerlogin(Login login) {
		String isemail=login.getEmail();
		if(loginrepository.findByEmail(isemail)!=null  ) {
			return "Email already exists";
		}
		else if(loginrepository.findByEmail(isemail)==null) {
		Login savedlogin=loginrepository.save(login);
		Profile profile=new Profile();
		profile.setLogin(savedlogin);
		profilerepository.save(profile);
		favoriteService.createEmptyFavorite(savedlogin.getId());
		return "user added successfully";
	}
		return "user can't be added";
	}
	
	public String updatepasswordemail(String email, String password) {
		Login login=loginrepository.findByEmail(email) ;
		if(login!=null) {
		login.setPassword(password);
		loginrepository.save(login);
	
		return "password updated successfully";
		}
		else {
			return "user not found";
		}
	}
	
	public String getlogin (String email,String password) {
		Login loginmail= loginrepository.findByEmail(email);
		if(loginmail!=null) {
		String pw=loginmail.getPassword();
		if(pw.equals(password)) {
			return "logged in successful"+"/"+loginmail.getId();
		}
		else {
			return "email or password not match try forgot password";
		}
		}
		else {
			return "email not found please register";
		}
		
	}
	
	public String deletelogin(String email) {
		Login loginmail= loginrepository.findByEmail(email);
		Long del=loginmail.getId();
		loginrepository.deleteById(del);
		return "user deleted successfully";
	}
}
