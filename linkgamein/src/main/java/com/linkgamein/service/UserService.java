package com.linkgamein.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.linkgamein.model.User;
import com.linkgamein.repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository userServFromRepo;
	
	@Autowired
	public UserService(UserRepository userServFromRepo) {
		this.userServFromRepo = userServFromRepo;
	}
	
	//Métodos GET
	public List<User> getUsers() {
		return userServFromRepo.findAll();
	}
	public User getUserByEmail(String email) {
		return userServFromRepo.getByEmail(email);
	}
	
	//Método POST
	public void addUser(User newUser) {
		Optional<User> clientbyEmail = userServFromRepo.findByEmail( newUser.getEmail() );
		if( clientbyEmail.isPresent() )
			throw new IllegalStateException("El cliente ya se encuentra registrado");
		userServFromRepo.save(newUser);
	}
	
}
