package com.nhom5.backend.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

/**
 * Smoke test: /api/health mở công khai và trả đúng khuôn ApiResponse;
 * đường dẫn cần đăng nhập phải trả 401 khi không có token.
 */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class HealthControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void healthIsPublicAndReturnsApiResponse() throws Exception {
		mockMvc.perform(get("/api/health"))
				.andExpect(status().isOk())
				.andExpect(jsonPath("$.success").value(true))
				.andExpect(jsonPath("$.data.status").value("UP"));
	}

	@Test
	void protectedEndpointRequiresToken() throws Exception {
		mockMvc.perform(get("/api/admin/anything"))
				.andExpect(status().isUnauthorized());
	}
}
