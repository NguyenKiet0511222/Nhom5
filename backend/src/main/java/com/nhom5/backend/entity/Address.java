package com.nhom5.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Nationalized;

/** Sổ địa chỉ của khách hàng. */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "addresses")
public class Address extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Nationalized
    @Column(name = "receiver_name", nullable = false, length = 100)
    private String receiverName;

    @Column(name = "phone", nullable = false, length = 20)
    private String phone;

    @Nationalized
    @Column(name = "province", nullable = false, length = 100)
    private String province;

    @Nationalized
    @Column(name = "district", nullable = false, length = 100)
    private String district;

    @Nationalized
    @Column(name = "ward", length = 100)
    private String ward;

    @Nationalized
    @Column(name = "street", nullable = false, length = 255)
    private String street;

    @Column(name = "is_default", nullable = false)
    @Builder.Default
    private Boolean defaultAddress = false;
}