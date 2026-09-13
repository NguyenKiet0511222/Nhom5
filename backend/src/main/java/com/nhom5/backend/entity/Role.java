package com.nhom5.backend.entity;

/** Vai trò người dùng. Đăng ký thường luôn là CUSTOMER; SELLER do admin duyệt shop; ADMIN seed từ config. */
public enum Role {
	CUSTOMER,
	SELLER,
	ADMIN
}
