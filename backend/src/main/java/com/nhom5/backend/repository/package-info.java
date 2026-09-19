/**
 * Spring Data JPA repository, mỗi entity một interface:
 * {@code public interface ProductRepository extends JpaRepository<Product, Long>}.
 * Truy vấn phức tạp dùng {@code @Query} JPQL; tránh native SQL trừ khi bắt buộc (SQL Server).
 */
package com.nhom5.backend.repository;
