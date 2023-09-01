package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
import com.bloock.sdk.bridge.proto.IdentityEntitiesV2.BooleanAttributeDefinitionV2;

public class BooleanAttributeDescriptor extends AttributeDescriptor {
  public BooleanAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static BooleanAttributeDescriptor fromProto(BooleanAttributeDefinitionV2 res) {
    return new BooleanAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public BooleanAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.BooleanAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
