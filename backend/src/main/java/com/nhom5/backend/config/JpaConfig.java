package com.nhom5.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/** Bật auditing để BaseEntity tự điền createdAt / updatedAt. */
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}
