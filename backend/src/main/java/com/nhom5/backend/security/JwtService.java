package com.nhom5.backend.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.nhom5.backend.config.AppProperties;
import com.nhom5.backend.entity.User;

import lombok.RequiredArgsConstructor;

/**
 * Sinh JWT nội bộ (HS256) sau khi đăng nhập thành công.
 * Claims: sub = userId, email, role, iat, exp — đúng tài liệu thiết kế auth.
 * Việc xác thực token ở các request sau do Spring resource-server làm (JwtDecoder trong JwtConfig).
 */
@Service
@RequiredArgsConstructor
public class JwtService {

	private static final String ISSUER = "nhom5-backend";

	private final JwtEncoder jwtEncoder;
	private final AppProperties appProperties;

	public String generateToken(User user) {
		Instant now = Instant.now();
		JwtClaimsSet claims = JwtClaimsSet.builder()
				.issuer(ISSUER)
				.issuedAt(now)
				.expiresAt(now.plus(appProperties.jwt().expirationMinutes(), ChronoUnit.MINUTES))
				.subject(String.valueOf(user.getId()))
				.claim("email", user.getEmail())
				.claim("role", user.getRole().name())
				.build();
		JwsHeader header = JwsHeader.with(MacAlgorithm.HS256).build();
		return jwtEncoder.encode(JwtEncoderParameters.from(header, claims)).getTokenValue();
	}

	/** Thời hạn token tính bằng giây, trả cho client trong AuthResponse.expiresIn. */
	public long expiresInSeconds() {
		return appProperties.jwt().expirationMinutes() * 60;
	}
}
