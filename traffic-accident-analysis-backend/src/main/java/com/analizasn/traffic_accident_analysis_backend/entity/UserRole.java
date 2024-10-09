package com.analizasn.traffic_accident_analysis_backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "users_roles", schema = "traffic_accident_analysis")
@IdClass(UsersRolesId.class)
public class UserRole {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Id
    @Column(name = "role_id")
    private Long roleId;
}
