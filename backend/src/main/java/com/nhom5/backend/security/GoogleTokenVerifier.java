package com.nhom5.backend.security;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimNames;
import org.springframework.security.oauth2.jwt.JwtClaimValidator;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.JwtValidators;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import com.nhom5.backend.config.AppProperties;
import com.nhom5.backend.exception.AppException;

import lombok.RequiredArgsConstructor;

/**
 * Xác minh Google ID token (do frontend lấy từ Google Identity Services) bằng JWKS công khai của Google.
 * Không cần thư viện google-api-client. Decoder được tạo lười (lần gọi đầu) và KHÔNG đăng ký làm bean
 * để không đụng với JwtDecoder nội bộ của resource-server.
 */
@Component
@RequiredArgsConstructor
public class GoogleTokenVerifier {

	private static final String GOOGLE_JWK_SET_URI = "https://www.googleapis.com/oauth2/v3/certs";
	private static final Set<String> GOOGLE_ISSUERS = Set.of("https://accounts.google.com", "accounts.google.com");

	private final AppProperties appProperties;
	private volatile JwtDecoder googleDecoder;

	/** @return claims của ID token (sub, email, email_verified, name, picture...) nếu hợp lệ. */
	public Jwt verify(String idToken) {
		String clientId = appProperties.google() == null ? null : appProperties.google().clientId();
		if (clientId == null || clientId.isBlank()) {
			throw new AppException(HttpStatus.SERVICE_UNAVAILABLE,
					"Đăng nhập Google chưa được cấu hình (thiếu GOOGLE_CLIENT_ID)");
		}
		try {
			return decoder(clientId).decode(idToken);
		} catch (JwtException ex) {
			throw AppException.unauthorized("ID token Google không hợp lệ: " + ex.getMessage());
		}
	}

	private JwtDecoder decoder(String clientId) {
		if (googleDecoder == null) {
			synchronized (this) {
				if (googleDecoder == null) {
					NimbusJwtDecoder decoder = NimbusJwtDecoder.withJwkSetUri(GOOGLE_JWK_SET_URI).build();
					// Google phát iss dưới 2 dạng, và aud phải đúng Client ID của mình
					OAuth2TokenValidator<Jwt> issuer = new JwtClaimValidator<Object>(JwtClaimNames.ISS,
							iss -> iss != null && GOOGLE_ISSUERS.contains(iss.toString()));
					OAuth2TokenValidator<Jwt> audience = new JwtClaimValidator<List<String>>(JwtClaimNames.AUD,
							aud -> aud != null && aud.contains(clientId));
					decoder.setJwtValidator(new DelegatingOAuth2TokenValidator<>(
							JwtValidators.createDefault(), issuer, audience));
					googleDecoder = decoder;
				}
			}
		}
		return googleDecoder;
	}
}
