package com.nhom5.backend.entity;

import org.hibernate.annotations.Nationalized;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Bảng users — theo tài liệu thiết kế auth (script: resources/db/02_users.sql).
 * Hỗ trợ đồng thời đăng nhập thường (LOCAL) và Google (GOOGLE).
 */
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "uk_users_email", columnNames = "email"))
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity {

	@Nationalized
	@Column(name = "full_name", nullable = false, length = 100)
	private String fullName;

	/** Email đăng nhập, lưu chữ thường, không trùng. */
	@Nationalized
	@Column(name = "email", nullable = false, length = 150)
	private String email;

	/** BCrypt hash; NULL nếu tài khoản chỉ đăng nhập bằng Google. */
	@Column(name = "password_hash", length = 255)
	private String passwordHash;

	@Enumerated(EnumType.STRING)
	@Column(name = "provider", nullable = false, length = 20)
	private AuthProvider provider = AuthProvider.LOCAL;

	/** Google "sub" id, chỉ có khi từng đăng nhập Google. */
	@Column(name = "provider_id", length = 255)
	private String providerId;

	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false, length = 20)
	private Role role = Role.CUSTOMER;

	@Nationalized
	@Column(name = "avatar_url", length = 255)
	private String avatarUrl;

	/** false = bị khoá, không cho đăng nhập. */
	@Column(name = "is_active", nullable = false)
	private boolean active = true;
}
