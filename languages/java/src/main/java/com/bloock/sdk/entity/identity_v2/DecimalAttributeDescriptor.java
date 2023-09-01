package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DecimalAttributeDescriptor extends AttributeDescriptor {
  public DecimalAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DecimalAttributeDescriptor fromProto(
      IdentityEntitiesV2.DecimalAttributeDefinitionV2 res) {
    return new DecimalAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntitiesV2.DecimalAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.DecimalAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
