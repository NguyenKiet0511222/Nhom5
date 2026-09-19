package com.nhom5.backend.entity;

import com.nhom5.backend.entity.enums.AuthProvider;
import com.nhom5.backend.entity.enums.Role;
import com.nhom5.backend.entity.enums.UserStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "users", uniqueConstraints = @UniqueConstraint(name = "uk_users_email", columnNames = "email"))
public class User extends BaseEntity {

    @Nationalized
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @Nationalized
    @Column(name = "email", nullable = false, length = 150)
    private String email;

    @Column(name = "phone", length = 20)
    private String phone;

    /** null với tài khoản Google. */
    @Nationalized
    @Column(name = "password_hash", length = 255)
    private String passwordHash;

    @Enumerated(EnumType.STRING)
    @Column(name = "provider", nullable = false, length = 20)
    @Builder.Default
    private AuthProvider provider = AuthProvider.LOCAL;

    @Nationalized
    @Column(name = "provider_id", length = 255)
    private String providerId;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false, length = 20)
    @Builder.Default
    private Role role = Role.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    private UserStatus status = UserStatus.ACTIVE;

    @Nationalized
    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;
}