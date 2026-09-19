package com.nhom5.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // dùng H2, không cần SQL Server
class BackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
