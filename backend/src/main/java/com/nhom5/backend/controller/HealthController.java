package com.nhom5.backend.controller;

import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhom5.backend.dto.response.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

/**
 * Endpoint kiểm tra backend còn sống (dùng cho frontend/AI/Docker healthcheck).
 * Đồng thời là mẫu tham khảo cách viết controller: trả ApiResponse, có @Tag/@Operation cho Swagger.
 */
@RestController
@RequestMapping("/api/health")
@Tag(name = "Health", description = "Kiểm tra trạng thái backend")
public class HealthController {

	@GetMapping
	@Operation(summary = "Backend đang chạy?")
	public ApiResponse<Map<String, String>> health() {
		return ApiResponse.ok(Map.of(
				"status", "UP",
				"service", "backend",
				"time", LocalDateTime.now().toString()));
	}
}
