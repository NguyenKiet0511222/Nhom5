package com.nhom5.backend.entity;

/** Cách tài khoản được tạo: LOCAL = email/mật khẩu, GOOGLE = đăng nhập Google (password_hash NULL). */
public enum AuthProvider {
	LOCAL,
	GOOGLE
}
