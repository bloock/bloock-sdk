package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a descriptor for a date attribute, including its display name, ID, description, and required status.
 */
public class DateAttributeDescriptor extends AttributeDescriptor {
  /**
   * Constructs an DateAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public DateAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DateAttributeDescriptor fromProto(
      IdentityEntities.DateAttributeDefinition res) {
    return new DateAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntities.DateAttributeDefinition toProto() {
    return IdentityEntities.DateAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
