package com.nhom5.backend.dto.response;

/** Kết quả đăng nhập (thường và Google dùng chung). expiresIn tính bằng giây. */
public record AuthResponse(
		String accessToken,
		String tokenType,
		long expiresIn,
		UserResponse user) {

	public static AuthResponse bearer(String accessToken, long expiresIn, UserResponse user) {
		return new AuthResponse(accessToken, "Bearer", expiresIn, user);
	}
}
