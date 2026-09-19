package com.nhom5.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

/** POST /api/auth/google — idToken do Google Identity Services cấp cho frontend. */
public record GoogleLoginRequest(
		@NotBlank(message = "Thiếu idToken của Google")
		String idToken) {
}
