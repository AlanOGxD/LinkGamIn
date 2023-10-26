package com.linkgamein.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user", unique=true, nullable=false)
	
	//Atributos
	private Long id;
	private String first_name, last_name, nickname, email, password, confirm_pass;
	
	//1. Constructor
	public User(Long id, String first_name, String last_name, String nickname, String email, String password, String confirm_pass) {
		this.id = id;
		this.first_name = first_name;
		this.last_name = last_name;
		this.nickname = nickname;
		this.email = email;
		this.password = password;
		this.confirm_pass = confirm_pass;
	}
	
	//2. Constructor vacío
	public User() {
	}

	//3. Getters y Setters
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFirst_name() {
		return first_name;
	}
	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}
	public String getLast_name() {
		return last_name;
	}
	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirm_pass() {
		return confirm_pass;
	}
	public void setConfirm_pass(String confirm_pass) {
		this.confirm_pass = confirm_pass;
	}

	//4. toString()
	@Override
	public String toString() {
		return "User [id=" + id + ", first_name=" + first_name + ", last_name=" + last_name + ", nickname=" + nickname	+ ", email=" + email + ", password=" + password + ", confirm_pass=" + confirm_pass + "]";
	}
	
}
