/**
 * DTO nhận dữ liệu từ client (body của POST/PUT). Quy ước:
 * <ul>
 *   <li>Dùng {@code record}, tên kết thúc bằng {@code Request}: {@code CreateProductRequest}.</li>
 *   <li>Validate bằng jakarta.validation ({@code @NotBlank}, {@code @Min}...) với message tiếng Việt,
 *       controller nhận bằng {@code @Valid @RequestBody}.</li>
 *   <li>Không bao giờ nhận thẳng entity từ client.</li>
 * </ul>
 */
package com.nhom5.backend.dto.request;
