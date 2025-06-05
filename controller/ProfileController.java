package com.example.Nithinproject;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Nithinproject.entity.Profile;
import com.example.Nithinproject.service.ProfileService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/music")
public class ProfileController {
	@Autowired
	ProfileService profileservice;
	@GetMapping("/profileget")
	public Optional<Profile> getprofile(@RequestParam("Login_id") String loginIdStr) {
		Long loginId=Long.parseLong(loginIdStr);
		return profileservice.profileGet(loginId);
	}
	@PutMapping("/profilepost")
	public String postprofile(@RequestBody Profile profile,@RequestParam("Login_id") String loginIdStr) {
		Long loginId=Long.parseLong(loginIdStr);
		return profileservice.postprofile(profile,loginId);
	}
}

