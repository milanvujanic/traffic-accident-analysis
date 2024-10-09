package com.analizasn.traffic_accident_analysis_backend.entity;

import lombok.EqualsAndHashCode;

import java.io.Serializable;

@EqualsAndHashCode
public class UsersRolesId implements Serializable {

    private Long userId;
    private Long roleId;
}
