package com.analizasn.traffic_accident_analysis_backend.entity.enums;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class RoleConverter implements AttributeConverter<RoleEnum, String> {

    @Override
    public String convertToDatabaseColumn(RoleEnum role) {
        return role == null
                ? null
                : role.name();
    }

    @Override
    public RoleEnum convertToEntityAttribute(String roleName) {
        return roleName == null
                ? null
                : RoleEnum.valueOf(roleName);
    }
}
