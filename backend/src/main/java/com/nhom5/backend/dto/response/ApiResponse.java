package com.nhom5.backend.dto.response;

/**
 * Khuôn JSON chung cho MỌI response của API, để frontend xử lý thống nhất:
 * <pre>{ "success": true, "message": null, "data": {...} }</pre>
 */
public record ApiResponse<T>(boolean success, String message, T data) {

	public static <T> ApiResponse<T> ok(T data) {
		return new ApiResponse<>(true, null, data);
	}

	public static <T> ApiResponse<T> ok(String message, T data) {
		return new ApiResponse<>(true, message, data);
	}

	public static <T> ApiResponse<T> error(String message) {
		return new ApiResponse<>(false, message, null);
	}
}
