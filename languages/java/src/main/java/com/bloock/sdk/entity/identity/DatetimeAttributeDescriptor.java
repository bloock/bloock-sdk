package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a descriptor for an attribute with a datetime value.
 */
public class DatetimeAttributeDescriptor extends AttributeDescriptor {
  /**
   * Constructs an DatetimeAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public DatetimeAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DatetimeAttributeDescriptor fromProto(
      IdentityEntities.DateTimeAttributeDefinition res) {
    return new DatetimeAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntities.DateTimeAttributeDefinition toProto() {
    return IdentityEntities.DateTimeAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
