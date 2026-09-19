package com.nhom5.backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/** POST /api/auth/register */
public record RegisterRequest(
		@NotBlank(message = "Họ tên không được để trống")
		@Size(max = 100, message = "Họ tên tối đa 100 ký tự")
		String fullName,

		@NotBlank(message = "Email không được để trống")
		@Email(message = "Email không đúng định dạng")
		@Size(max = 150, message = "Email tối đa 150 ký tự")
		String email,

		@NotBlank(message = "Mật khẩu không được để trống")
		@Size(min = 6, max = 72, message = "Mật khẩu từ 6 đến 72 ký tự")
		String password,

		@NotBlank(message = "Vui lòng nhập lại mật khẩu")
		String confirmPassword) {
}
