package com.social.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.*;
import static org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace.NONE;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.social.dao.UserRepository;
import com.social.entities.User;
import com.social.services.UserService;

@ActiveProfiles("test")
@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = NONE)
public class UserRepositoryTest {

	@Autowired
	private TestEntityManager entityManager;
	@Autowired
	private UserRepository userRepository;

	@Test
	public void testSave() {
		User user = new User();
		user.setUsername("user.user");
		user.setFullName("kamalbberriga");
		entityManager.persist(user);
		entityManager.flush();
		// when
		User testUser = userRepository.findOne(user.getId());
		// then
		assertThat(testUser.getFullName()).isEqualTo(user.getFullName());
	}


	// test method for the findOneByUsername
    @Test
    public void findOneByUsername() {
    	User user = new User();
		user.setUsername("user.user");
		user.setFullName("kamalberriga");
        entityManager.persist(user);

        User testUser = userRepository.findOneByUsername(user.getUsername());
		// then
		assertThat(testUser.getUsername()).isEqualTo(user.getUsername());
    }
	
	

}
