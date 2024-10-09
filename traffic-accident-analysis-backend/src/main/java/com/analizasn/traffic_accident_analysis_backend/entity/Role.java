package com.analizasn.traffic_accident_analysis_backend.entity;

import com.analizasn.traffic_accident_analysis_backend.entity.enums.RoleEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles", schema = "traffic_accident_analysis")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long roleId;

    @Column(name = "name")
    @Enumerated(EnumType.STRING)
    private RoleEnum name;
}
