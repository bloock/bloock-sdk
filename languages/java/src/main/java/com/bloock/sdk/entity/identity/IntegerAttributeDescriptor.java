package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents a descriptor for an attribute with an integer value.
 */
public class IntegerAttributeDescriptor extends AttributeDescriptor {
  /**
   * Constructs an IntegerAttributeDescriptor object with the specified
   * parameters.
   * 
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   */
  public IntegerAttributeDescriptor(
      String displayName, String technicalName, String description, Boolean required) {
    super(displayName, technicalName, description, required);
  }

  public static IntegerAttributeDescriptor fromProto(
      BloockIdentityEntities.IntegerAttributeDefinition res) {
    return new IntegerAttributeDescriptor(
        res.getDisplayName(), res.getId(), res.getDescription(), res.getRequired());
  }

  public BloockIdentityEntities.IntegerAttributeDefinition toProto() {
    return BloockIdentityEntities.IntegerAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .build();
  }
}
