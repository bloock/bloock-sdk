package com.bloock.sdk.entity.identity_v2;

import java.util.List;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DecimalEnumAttributeDescriptor extends AttributeDescriptor {
  private List<Double> enumeration;

  public DecimalEnumAttributeDescriptor(String displayName, String technicalName, String description, Boolean required,
      List<Double> enumeration) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public static DecimalEnumAttributeDescriptor fromProto(
      IdentityEntitiesV2.DecimalEnumAttributeDefinitionV2 res) {
    return new DecimalEnumAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription(),
        res.getRequired(), res.getEnumList());
  }

  public IdentityEntitiesV2.DecimalEnumAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.DecimalEnumAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .addAllEnum(this.enumeration)
        .build();
  }
}
