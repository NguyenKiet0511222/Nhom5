package com.nhom5.backend.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

/**
 * Lỗi nghiệp vụ có mã HTTP đi kèm. Ném từ service, GlobalExceptionHandler sẽ đổi thành ApiResponse.
 * Ví dụ: {@code throw AppException.notFound("Không tìm thấy sản phẩm #" + id);}
 */
@Getter
public class AppException extends RuntimeException {

	private final HttpStatus status;

	public AppException(HttpStatus status, String message) {
		super(message);
		this.status = status;
	}

	public static AppException badRequest(String message) {
		return new AppException(HttpStatus.BAD_REQUEST, message);
	}

	public static AppException unauthorized(String message) {
		return new AppException(HttpStatus.UNAUTHORIZED, message);
	}

	public static AppException forbidden(String message) {
		return new AppException(HttpStatus.FORBIDDEN, message);
	}

	public static AppException notFound(String message) {
		return new AppException(HttpStatus.NOT_FOUND, message);
	}

	public static AppException conflict(String message) {
		return new AppException(HttpStatus.CONFLICT, message);
	}
}
