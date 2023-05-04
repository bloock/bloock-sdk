package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class DateAttributeDescriptor extends AttributeDescriptor {
  public DateAttributeDescriptor(String displayName, String technicalName, String description) {
    super(displayName, technicalName, description);
  }

  public static DateAttributeDescriptor fromProto(IdentityEntities.DateAttributeDefinition res) {
    return new DateAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription());
  }

  public IdentityEntities.DateAttributeDefinition toProto() {
    return IdentityEntities.DateAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .build();
  }
}
