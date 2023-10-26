package com.linkgamein.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.linkgamein.model.User;
import com.linkgamein.service.UserService;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class UserController {
	
	private final UserService clientContrFromServ;
	
	@Autowired
	public UserController(UserService clientContrFromServ) {
		this.clientContrFromServ = clientContrFromServ;
	}
	
	@GetMapping
	public List<User> getUsers() {
		return clientContrFromServ.getUsers();
	}
	@GetMapping(path = "byEmail")
	public ResponseEntity<User> getUserByEmail(@RequestParam String email) {
		User newUser = clientContrFromServ.getUserByEmail(email);
		return new ResponseEntity<>(newUser, HttpStatus.OK);
	}
	
	//Método para crear nuevos usuarios desde el Service
	@PostMapping
	public void addUser(@RequestBody User newUser) {
		clientContrFromServ.addUser(newUser);
	}
	
}