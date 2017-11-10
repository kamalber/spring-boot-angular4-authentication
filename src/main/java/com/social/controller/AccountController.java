package com.social.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.social.services.UserService;
import com.social.util.CustomErrorType;
import com.social.entities.User;

@RestController
@RequestMapping("account")
public class AccountController {

	public static final Logger logger = LoggerFactory.getLogger(AccountController.class);

	@Autowired
	private UserService userService;

	// this is function to create a new account by a guest 
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<?> createUser(@RequestBody User appUser) {
		if (userService.find(appUser.getUsername()) != null) {
			logger.error("username Already exist " + appUser.getUsername());
			return new ResponseEntity(
					new CustomErrorType("user with username " + appUser.getUsername() + "already exist "),
					HttpStatus.CONFLICT);
		}
		
		return new ResponseEntity<User>(userService.save(appUser), HttpStatus.CREATED);
	}

}
