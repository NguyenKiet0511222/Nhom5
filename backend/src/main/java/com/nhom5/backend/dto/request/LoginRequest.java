package com.nhom5.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/** POST /api/auth/login */
public record LoginRequest(
		@NotBlank(message = "Email không được để trống")
		@Email(message = "Email không đúng định dạng")
		String email,

		@NotBlank(message = "Mật khẩu không được để trống")
		String password) {
}
