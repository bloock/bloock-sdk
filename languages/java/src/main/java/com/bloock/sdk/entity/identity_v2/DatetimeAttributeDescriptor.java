package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DatetimeAttributeDescriptor extends AttributeDescriptor {
  public DatetimeAttributeDescriptor(String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DatetimeAttributeDescriptor fromProto(
      IdentityEntitiesV2.DateTimeAttributeDefinitionV2 res) {
    return new DatetimeAttributeDescriptor(res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntitiesV2.DateTimeAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.DateTimeAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
