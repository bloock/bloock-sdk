package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.IdentityEntities.BooleanAttributeDefinition;

/**
 * Represents a descriptor for a boolean attribute.
 */
public class BooleanAttributeDescriptor extends AttributeDescriptor {
  /**
   * Creates a new BooleanAttributeDescriptor instance with the provided details.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public BooleanAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static BooleanAttributeDescriptor fromProto(BooleanAttributeDefinition res) {
    return new BooleanAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public BooleanAttributeDefinition toProto() {
    return IdentityEntities.BooleanAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
