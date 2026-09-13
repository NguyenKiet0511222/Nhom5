package com.nhom5.backend.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

/** Luồng auth end-to-end trên H2: đăng ký -> đăng nhập -> /me, phân quyền ADMIN/CUSTOMER, lỗi 400/401/403. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AuthControllerTest {

	private static final Pattern TOKEN_PATTERN = Pattern.compile("\"accessToken\":\"([^\"]+)\"");

	@Autowired
	private MockMvc mockMvc;

	@Test
	void registerThenLoginThenMe() throws Exception {
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(registerJson("Nguyen Van A", "a@test.com", "secret123")))
				.andExpect(status().isCreated())
				.andExpect(jsonPath("$.success").value(true))
				.andExpect(jsonPath("$.data.userId").isNumber());

		String token = login("a@test.com", "secret123");

		mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + token))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.email").value("a@test.com"))
				.andExpect(jsonPath("$.data.role").value("CUSTOMER"))
				.andExpect(jsonPath("$.data.provider").value("LOCAL"));
	}

	@Test
	void registerRejectsDuplicateEmailAndMismatchedPassword() throws Exception {
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(registerJson("B", "b@test.com", "secret123")))
				.andExpect(status().isCreated());

		// Email đã tồn tại (khác hoa/thường vẫn tính là trùng)
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(registerJson("B2", "B@Test.com", "secret123")))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.success").value(false))
				.andExpect(jsonPath("$.message").value("Email đã được đăng ký"));

		// Mật khẩu xác nhận không khớp
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"fullName\":\"C\",\"email\":\"c@test.com\",\"password\":\"secret123\",\"confirmPassword\":\"other\"}"))
				.andExpect(status().isBadRequest());

		// Validation: thiếu field -> map lỗi theo field
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"email\":\"not-an-email\"}"))
				.andExpect(status().isBadRequest())
				.andExpect(jsonPath("$.data.fullName").exists())
				.andExpect(jsonPath("$.data.email").exists());
	}

	@Test
	void loginWithWrongPasswordIs401() throws Exception {
		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(registerJson("D", "d@test.com", "secret123")))
				.andExpect(status().isCreated());

		mockMvc.perform(post("/api/auth/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"email\":\"d@test.com\",\"password\":\"wrong\"}"))
				.andExpect(status().isUnauthorized())
				.andExpect(jsonPath("$.success").value(false));
	}

	@Test
	void meWithoutOrWithBadTokenIs401Json() throws Exception {
		mockMvc.perform(get("/api/auth/me"))
				.andExpect(status().isUnauthorized())
				.andExpect(jsonPath("$.success").value(false));

		mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer not.a.jwt"))
				.andExpect(status().isUnauthorized())
				.andExpect(jsonPath("$.success").value(false));
	}

	@Test
	void seededAdminCanReachAdminAreaButCustomerCannot() throws Exception {
		// AdminSeeder tạo admin từ app.admin.* mặc định trong application.properties
		String adminToken = login("admin@nongsan.local", "Admin@123");
		mockMvc.perform(get("/api/auth/me").header("Authorization", "Bearer " + adminToken))
				.andExpect(jsonPath("$.data.role").value("ADMIN"));

		// Qua được tầng phân quyền -> tới controller -> chưa có endpoint -> 404 (không phải 401/403)
		mockMvc.perform(get("/api/admin/anything").header("Authorization", "Bearer " + adminToken))
				.andExpect(status().isNotFound());

		mockMvc.perform(post("/api/auth/register")
				.contentType(MediaType.APPLICATION_JSON)
				.content(registerJson("E", "e@test.com", "secret123")))
				.andExpect(status().isCreated());
		String customerToken = login("e@test.com", "secret123");

		mockMvc.perform(get("/api/admin/anything").header("Authorization", "Bearer " + customerToken))
				.andExpect(status().isForbidden())
				.andExpect(jsonPath("$.success").value(false));
	}

	@Test
	void googleLoginIs503WhenNotConfigured() throws Exception {
		mockMvc.perform(post("/api/auth/google")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"idToken\":\"anything\"}"))
				.andExpect(status().isServiceUnavailable())
				.andExpect(jsonPath("$.success").value(false));
	}

	private String login(String email, String password) throws Exception {
		String body = mockMvc.perform(post("/api/auth/login")
				.contentType(MediaType.APPLICATION_JSON)
				.content("{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.data.tokenType").value("Bearer"))
				.andExpect(jsonPath("$.data.expiresIn").isNumber())
				.andReturn().getResponse().getContentAsString(StandardCharsets.UTF_8);
		Matcher matcher = TOKEN_PATTERN.matcher(body);
		assertThat(matcher.find()).as("response phải chứa accessToken").isTrue();
		return matcher.group(1);
	}

	private static String registerJson(String fullName, String email, String password) {
		return "{\"fullName\":\"" + fullName + "\",\"email\":\"" + email + "\",\"password\":\"" + password
				+ "\",\"confirmPassword\":\"" + password + "\"}";
	}
}
