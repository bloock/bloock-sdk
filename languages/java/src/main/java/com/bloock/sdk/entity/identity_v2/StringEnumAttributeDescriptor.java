package com.bloock.sdk.entity.identity_v2;

import java.util.List;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class StringEnumAttributeDescriptor extends AttributeDescriptor {
  private List<String> enumeration;

  public StringEnumAttributeDescriptor(String displayName, String technicalName, String description, Boolean required,
      List<String> enumeration) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public static StringEnumAttributeDescriptor fromProto(
      IdentityEntitiesV2.StringEnumAttributeDefinitionV2 res) {
    return new StringEnumAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription(),
        res.getRequired(), res.getEnumList());
  }

  public IdentityEntitiesV2.StringEnumAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.StringEnumAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .addAllEnum(this.enumeration)
        .build();
  }
}
