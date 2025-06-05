package com.example.Nithinproject.entity;

import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKeyColumn;
import jakarta.persistence.JoinColumn;

@Entity
public class Songs {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;

private String title;
private String image;
@ElementCollection
@CollectionTable(name="song_details",joinColumns=@JoinColumn(name="song_id"))
@MapKeyColumn(name="song_name")
@Column(name="song_link")
private Map<String,String> songs;

public Songs() {
	
}
public Songs(String title,String image,Map<String,String> songs) {
	
}
public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public String getTitle() {
	return title;
}
public void setTitle(String title) {
	this.title = title;
}
public String getImage() {
	return image;
}
public void setImage(String image) {
	this.image = image;
}
public Map<String, String> getSongs() {
	return songs;
}
public void setSongs(Map<String, String> songs) {
	this.songs = songs;
}

}
