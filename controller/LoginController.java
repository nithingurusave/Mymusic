package com.example.Nithinproject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.Nithinproject.entity.Login;
import com.example.Nithinproject.service.LoginService;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/music")
public class LoginController {
	@Autowired
	LoginService loginservice;
	@PostMapping("/register")
	public String register(@RequestBody Login login ) {
		return loginservice.registerlogin(login);
	}
	
	@PostMapping("/updatepassword")
	public String updatepassword(@RequestParam("email") String email,@RequestParam("password") String password   ) {
		return loginservice.updatepasswordemail(email,password);
	}
	
	@DeleteMapping("/delete/{email}")
	public String register(@PathVariable("email") String email ) {
		return loginservice.deletelogin(email);
	}
	@GetMapping("/get/{email}/{password}")
	public String getuserbyemail(@PathVariable("email") String email,@PathVariable("password") String password) {
		return loginservice.getlogin(email,password);
	}
}
