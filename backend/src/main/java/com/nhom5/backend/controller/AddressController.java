package com.nhom5.backend.controller;

import com.nhom5.backend.entity.Address;
import com.nhom5.backend.repository.AddressRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
@Tag(name = "Address API", description = "Quản lý sổ địa chỉ giao hàng của người dùng")
public class AddressController {

    private final AddressRepository addressRepository;

    @GetMapping("/user/{userId}")
    @Operation(summary = "Lấy danh sách địa chỉ của người dùng", description = "Danh sách các địa chỉ giao hàng theo User ID")
    public ResponseEntity<List<Address>> getAddressesByUserId(@PathVariable Long userId) {
        List<Address> addresses = addressRepository.findByUserId(userId);
        return ResponseEntity.ok(addresses);
    }

    @GetMapping("/user/{userId}/default")
    @Operation(summary = "Lấy địa chỉ mặc định của người dùng", description = "Địa chỉ nhận hàng mặc định theo User ID")
    public ResponseEntity<Address> getDefaultAddress(@PathVariable Long userId) {
        return addressRepository.findByUserIdAndDefaultAddressTrue(userId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Chi tiết một địa chỉ", description = "Lấy chi tiết địa chỉ theo Address ID")
    public ResponseEntity<Address> getAddressById(@PathVariable Long id) {
        return addressRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
