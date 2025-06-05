package com.example.Nithinproject.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Nithinproject.entity.Profile;
import com.example.Nithinproject.repository.ProfileRepository;
@Service
public class ProfileService {
	@Autowired
	ProfileRepository profilerepository;
	public Optional<Profile> profileGet(Long loginId) {
		return profilerepository.findByLoginId(loginId);
	}
	public String postprofile(Profile profile,Long loginId) {
		Optional<Profile> optionalProfile=profilerepository.findByLoginId(loginId);
		if(optionalProfile.isPresent()) {
			Profile profile1=optionalProfile.get();
			profile1.setName(profile.getName());
			profile1.setAge(profile.getAge());
	        profile1.setGender(profile.getGender());
	        profile1.setPhone(profile.getPhone());
	        profile1.setEmail(profile.getEmail());
	        
	        profilerepository.save(profile1);
		return "profile updated successfully";
		}
		else {
			return "profile can't be updated";
		}
	}

}
