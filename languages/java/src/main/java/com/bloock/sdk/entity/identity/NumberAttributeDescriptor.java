package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class NumberAttributeDescriptor extends AttributeDescriptor {
  public NumberAttributeDescriptor(String displayName, String technicalName, String description) {
    super(displayName, technicalName, description);
  }

  public static NumberAttributeDescriptor fromProto(
      IdentityEntities.NumberAttributeDefinition res) {
    return new NumberAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription());
  }

  public IdentityEntities.NumberAttributeDefinition toProto() {
    return IdentityEntities.NumberAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .build();
  }
}
