package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class DatetimeAttributeDescriptor extends AttributeDescriptor {
  public DatetimeAttributeDescriptor(String displayName, String technicalName, String description) {
    super(displayName, technicalName, description);
  }

  public static DatetimeAttributeDescriptor fromProto(
      IdentityEntities.DateTimeAttributeDefinition res) {
    return new DatetimeAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription());
  }

  public IdentityEntities.DateTimeAttributeDefinition toProto() {
    return IdentityEntities.DateTimeAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .build();
  }
}
