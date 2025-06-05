package com.example.Nithinproject.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Nithinproject.entity.Songs;
import com.example.Nithinproject.repository.SongRepository;

@Service
public class SongService {
	@Autowired
	private SongRepository songrepository;
	
	public String addalbum(Songs songs) {
		String title=songs.getTitle();
		if(title!=null) {
		Songs exist=songrepository.findByTitle(title);
		if(exist==null) {
		songrepository.save(songs);
		return "album added successfully";
		}
		return "album already exist";
	    }
	   
	   else {
		return "Please enter movie title";
	   }
	}
	
	public String updatealbum(Songs songs) {
		String title=songs.getTitle();
		Songs exist=songrepository.findByTitle(title);
		if(exist!=null) {
		exist.setSongs(songs.getSongs());
		songrepository.save(songs);
		return "album updated successfully";
		}
		return "album not exist";
	}
	
	public List<Songs> getalbums(){
		return songrepository.findAll();
	}
}
