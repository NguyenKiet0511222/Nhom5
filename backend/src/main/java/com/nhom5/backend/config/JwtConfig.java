package com.nhom5.backend.config;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

import lombok.RequiredArgsConstructor;

/**
 * Bean phát hành (JwtEncoder) và xác minh (JwtDecoder) JWT bằng khóa đối xứng HS256.
 * Dùng Nimbus có sẵn trong Spring Security, không cần thư viện jjwt.
 *
 * Cách phát token (làm ở tuần 3, trong service auth):
 * <pre>
 * JwtClaimsSet claims = JwtClaimsSet.builder()
 *     .subject(user.getEmail())
 *     .claim("roles", List.of("SELLER"))
 *     .issuedAt(now).expiresAt(now.plus(expirationMinutes, ChronoUnit.MINUTES))
 *     .build();
 * String token = jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
 * </pre>
 */
@Configuration
@RequiredArgsConstructor
public class JwtConfig {

	private final AppProperties appProperties;

	private SecretKey secretKey() {
		byte[] keyBytes = appProperties.jwt().secret().getBytes(StandardCharsets.UTF_8);
		return new SecretKeySpec(keyBytes, "HmacSHA256");
	}

	@Bean
	JwtEncoder jwtEncoder() {
		return NimbusJwtEncoder.withSecretKey(secretKey()).build();
	}

	@Bean
	JwtDecoder jwtDecoder() {
		return NimbusJwtDecoder.withSecretKey(secretKey())
				.macAlgorithm(MacAlgorithm.HS256)
				.build();
	}
}
