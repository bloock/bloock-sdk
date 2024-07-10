package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents a descriptor for an attribute with a datetime value.
 */
public class DatetimeAttributeDescriptor extends AttributeDescriptor {
  /**
   * Constructs an DatetimeAttributeDescriptor object with the specified
   * parameters.
   * 
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
      BloockIdentityEntities.DateTimeAttributeDefinition res) {
    return new DatetimeAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public BloockIdentityEntities.DateTimeAttributeDefinition toProto() {
    return BloockIdentityEntities.DateTimeAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
