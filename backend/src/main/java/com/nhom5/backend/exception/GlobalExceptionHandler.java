package com.nhom5.backend.exception;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.resource.NoResourceFoundException;

import com.nhom5.backend.dto.response.ApiResponse;

import lombok.extern.slf4j.Slf4j;

/**
 * Bắt mọi exception và trả về ApiResponse thống nhất, để frontend luôn đọc được {@code message}.
 * Lỗi 401/403 từ tầng filter cũng được RestAuthenticationHandler chuyển vào đây.
 */
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	/** Lỗi nghiệp vụ do service chủ động ném. */
	@ExceptionHandler(AppException.class)
	ResponseEntity<ApiResponse<Void>> handleAppException(AppException ex) {
		return ResponseEntity.status(ex.getStatus()).body(ApiResponse.error(ex.getMessage()));
	}

	/** Lỗi validate @Valid trên request DTO: trả map field -> thông báo. */
	@ExceptionHandler(MethodArgumentNotValidException.class)
	ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new LinkedHashMap<>();
		ex.getBindingResult().getFieldErrors()
				.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));
		return ResponseEntity.badRequest()
				.body(new ApiResponse<>(false, "Dữ liệu không hợp lệ", errors));
	}

	/** Chưa đăng nhập, hoặc token sai/hết hạn. */
	@ExceptionHandler(AuthenticationException.class)
	ResponseEntity<ApiResponse<Void>> handleAuthentication(AuthenticationException ex) {
		String message = ex instanceof InvalidBearerTokenException
				? "Token không hợp lệ hoặc đã hết hạn"
				: "Bạn cần đăng nhập để thực hiện thao tác này";
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiResponse.error(message));
	}

	/** Đã đăng nhập nhưng không đủ quyền. */
	@ExceptionHandler(AccessDeniedException.class)
	ResponseEntity<ApiResponse<Void>> handleAccessDenied(AccessDeniedException ex) {
		return ResponseEntity.status(HttpStatus.FORBIDDEN)
				.body(ApiResponse.error("Bạn không có quyền thực hiện thao tác này"));
	}

	@ExceptionHandler(NoResourceFoundException.class)
	ResponseEntity<ApiResponse<Void>> handleNotFound(NoResourceFoundException ex) {
		return ResponseEntity.status(HttpStatus.NOT_FOUND)
				.body(ApiResponse.error("Không tìm thấy đường dẫn: " + ex.getResourcePath()));
	}

	@ExceptionHandler(HttpRequestMethodNotSupportedException.class)
	ResponseEntity<ApiResponse<Void>> handleMethodNotSupported(HttpRequestMethodNotSupportedException ex) {
		return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
				.body(ApiResponse.error("Phương thức " + ex.getMethod() + " không được hỗ trợ"));
	}

	/** Mọi lỗi chưa lường trước: log đầy đủ stack trace, không lộ chi tiết ra ngoài. */
	@ExceptionHandler(Exception.class)
	ResponseEntity<ApiResponse<Void>> handleUnexpected(Exception ex) {
		log.error("Lỗi không mong muốn", ex);
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(ApiResponse.error("Hệ thống gặp lỗi, vui lòng thử lại sau"));
	}
}
