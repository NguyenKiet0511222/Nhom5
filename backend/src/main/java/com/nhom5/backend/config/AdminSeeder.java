package com.nhom5.backend.config;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.nhom5.backend.entity.enums.AuthProvider;
import com.nhom5.backend.entity.enums.Role;
import com.nhom5.backend.entity.User;
import com.nhom5.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

/**
 * Tạo tài khoản ADMIN đầu tiên từ cấu hình app.admin.* nếu hệ thống chưa có ADMIN nào.
 * Không có cách nào khác để có ADMIN (đăng ký chỉ tạo CUSTOMER), nên bắt buộc phải seed.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class AdminSeeder implements ApplicationRunner {

	/** Mật khẩu mặc định trong application.properties — chỉ dành cho dev. */
	private static final String DEFAULT_DEV_PASSWORD = "Admin@123";

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AppProperties appProperties;

	@Override
	public void run(ApplicationArguments args) {
		AppProperties.Admin admin = appProperties.admin();
		if (admin == null || admin.email() == null || admin.email().isBlank()
				|| admin.password() == null || admin.password().isBlank()) {
			log.warn("Bỏ qua seed ADMIN: chưa cấu hình app.admin.email / app.admin.password");
			return;
		}
		if (userRepository.existsByRole(Role.ADMIN)) {
			return;
		}

		User user = new User();
		user.setFullName(admin.fullName() == null || admin.fullName().isBlank() ? "Admin" : admin.fullName());
		user.setEmail(admin.email().trim().toLowerCase());
		user.setPasswordHash(passwordEncoder.encode(admin.password()));
		user.setProvider(AuthProvider.LOCAL);
		user.setRole(Role.ADMIN);
		userRepository.save(user);

		log.info("Đã tạo tài khoản ADMIN mặc định: {}", user.getEmail());
		if (DEFAULT_DEV_PASSWORD.equals(admin.password())) {
			log.warn("ADMIN đang dùng mật khẩu mặc định của dev - đặt ADMIN_PASSWORD trước khi demo/triển khai!");
		}
	}
}
