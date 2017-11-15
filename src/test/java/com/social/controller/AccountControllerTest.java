package com.social.controller;

import static org.junit.Assert.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.social.entities.User;
import com.social.services.UserService;

@RunWith(SpringRunner.class)
@WebMvcTest(value = AccountController.class,secure=false)
public class AccountControllerTest {

	//MockMvc is the main entry point for server-side Spring MVC test support. 
	//It allows us to execute requests against the test context.
	@Autowired
	private MockMvc mockMvc;

	//MockBean is used to add mocks to a Spring ApplicationContext. 
	//A mock of userService is created and auto-wired into the AccountController.
	@MockBean
	private UserService userService;
	
	String exmapleUser = "{\"userName\":\"user\",\"password\":\"my pass\",\"fullName\":\"my fullName\"}";
	@Test
	public void registerTest() throws Exception {
		User mockUser = new User("my userName","my password","my fullName");
		

		// userService.save to respond back with mockUser
		Mockito.when(userService.save(Mockito.any(User.class))).thenReturn(mockUser);

		// Send user as body to '/account/register'
		RequestBuilder requestBuilder = MockMvcRequestBuilders
				.post("/account/register")
				.accept(MediaType.APPLICATION_JSON).content(exmapleUser)
				.contentType(MediaType.APPLICATION_JSON);

		MvcResult result = mockMvc.perform(requestBuilder).andReturn();

		MockHttpServletResponse response = result.getResponse();

		assertEquals(HttpStatus.CREATED.value(), response.getStatus());

	}


}
