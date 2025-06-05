package com.example.Nithinproject;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Nithinproject.entity.Songs;
import com.example.Nithinproject.service.SongService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/songs")
public class SongController {
	@Autowired
	private SongService songservice;
	
	@PostMapping("/postsong")
	public String postsong(@RequestBody Songs songs) {
		return songservice.addalbum(songs);
	}
	
	@PutMapping("/updatesong")
	public String updatesong(@RequestBody Songs songs) {
		return songservice.updatealbum(songs);
	}
	
	@GetMapping("getsongs")
	public List<Songs> getsong() {
		return songservice.getalbums();
	}
}
