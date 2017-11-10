package com.social.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import com.social.entities.User;
import com.social.services.UserService;

public class UserServiceTest {

	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private UserService userService;

	@Test
	public void testSave() {

		User user = new User();
		user.setUsername("user.user@user.com");
		user.setFullName("kamalbberriga");
		entityManager.persist(user);
		entityManager.flush();
		// when
		User testUser = userService.find(user.getId());
		// then
		assertThat(testUser.getFullName()).isEqualTo(user.getFullName());
	}

	@Test
	public void testUpdate() {
		fail("Not yet implemented"); // TODO
	}

}
