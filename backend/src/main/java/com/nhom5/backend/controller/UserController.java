package com.nhom5.backend.controller;

import com.nhom5.backend.entity.Role;
import com.nhom5.backend.entity.User;
import com.nhom5.backend.entity.enums.UserStatus;
import com.nhom5.backend.repository.UserRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User API", description = "Quản lý thông tin tài khoản người dùng")
public class UserController {

    private final UserRepository userRepository;

    @GetMapping
    @Operation(summary = "Lấy danh sách người dùng", description = "Tìm kiếm người dùng theo role, status, keyword và phân trang")
    public ResponseEntity<Page<User>> getUsers(
            @RequestParam(required = false) Role role,
            @RequestParam(required = false) UserStatus status,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<User> users = userRepository.search(role, status, keyword, PageRequest.of(page, size));
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Lấy chi tiết người dùng", description = "Lấy thông tin người dùng theo User ID")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
