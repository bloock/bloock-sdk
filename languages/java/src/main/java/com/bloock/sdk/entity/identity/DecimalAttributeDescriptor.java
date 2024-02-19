package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents a descriptor for an attribute with a decimal value.
 */
public class DecimalAttributeDescriptor extends AttributeDescriptor {
  /**
   * Constructs an DecimalAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public DecimalAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static DecimalAttributeDescriptor fromProto(
      IdentityEntities.DecimalAttributeDefinition res) {
    return new DecimalAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public IdentityEntities.DecimalAttributeDefinition toProto() {
    return IdentityEntities.DecimalAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
