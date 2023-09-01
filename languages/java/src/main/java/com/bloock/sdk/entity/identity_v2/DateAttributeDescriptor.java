package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class DateAttributeDescriptor extends AttributeDescriptor {
  public DateAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DateAttributeDescriptor fromProto(
      IdentityEntitiesV2.DateAttributeDefinitionV2 res) {
    return new DateAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntitiesV2.DateAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.DateAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
