package com.nhom5.backend.dto.response;

import java.time.LocalDateTime;

import com.nhom5.backend.entity.User;

/** Thông tin người dùng trả ra ngoài — không bao giờ lộ password_hash. */
public record UserResponse(
		Long id,
		String fullName,
		String email,
		String role,
		String provider,
		String avatarUrl,
		boolean active,
		LocalDateTime createdAt) {

	public static UserResponse from(User user) {
		return new UserResponse(
				user.getId(),
				user.getFullName(),
				user.getEmail(),
				user.getRole().name(),
				user.getProvider().name(),
				user.getAvatarUrl(),
				user.isActive(),
				user.getCreatedAt());
	}
}
