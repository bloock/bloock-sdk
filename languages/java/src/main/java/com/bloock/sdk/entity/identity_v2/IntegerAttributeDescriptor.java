package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class IntegerAttributeDescriptor extends AttributeDescriptor {
  public IntegerAttributeDescriptor(String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static IntegerAttributeDescriptor fromProto(
      IdentityEntitiesV2.IntegerAttributeDefinitionV2 res) {
    return new IntegerAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntitiesV2.IntegerAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.IntegerAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
