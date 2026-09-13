/**
 * Tầng nghiệp vụ. Controller chỉ nhận request → gọi service → trả ApiResponse; mọi logic nằm ở đây.
 * Quy ước: class {@code XxxService} với {@code @Service @RequiredArgsConstructor @Transactional},
 * ném {@link com.nhom5.backend.exception.AppException} khi lỗi nghiệp vụ.
 * Client gọi AI service (Python) cũng đặt trong package này (vd: {@code AiClassifierClient}).
 */
package com.nhom5.backend.service;
