package com.example.Nithinproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Profile {
@Id
@GeneratedValue(strategy=GenerationType.IDENTITY)
private Long id;
private String name;
private int age;
private String gender;
private Long phone;
private String email;
@OneToOne
@JoinColumn(name="login_id")
private Login login;

public Long getId() {
	return id;
}
public void setId(Long id) {
	this.id = id;
}
public Login getLogin() {
	return login;
}
public void setLogin(Login login) {
	this.login = login;
}
public String getName() {
	return name;
}
public void setName(String name) {
	this.name = name;
}
public int getAge() {
	return age;
}
public void setAge(int age) {
	this.age = age;
}
public String getGender() {
	return gender;
}
public void setGender(String gender) {
	this.gender = gender;
}
public Long getPhone() {
	return phone;
}
public void setPhone(Long phone) {
	this.phone = phone;
}
public String getEmail() {
	return email;
}
public void setEmail(String email) {
	this.email = email;
}


}
