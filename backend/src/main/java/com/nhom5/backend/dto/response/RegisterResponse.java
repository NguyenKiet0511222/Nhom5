package com.nhom5.backend.dto.response;

/** Kết quả đăng ký: chỉ trả id, không tự đăng nhập. */
public record RegisterResponse(Long userId) {
}
