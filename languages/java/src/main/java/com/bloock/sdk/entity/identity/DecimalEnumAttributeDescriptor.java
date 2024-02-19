package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import java.util.List;

/**
 * Represents a descriptor for an attribute with a decimal enum value.
 */
public class DecimalEnumAttributeDescriptor extends AttributeDescriptor {
  private List<Double> enumeration;

  /**
   * Constructs an DecimalEnumAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   */
  public DecimalEnumAttributeDescriptor(
      String displayName,
      String technicalName,
      String description,
      Boolean required,
      List<Double> enumeration) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public static DecimalEnumAttributeDescriptor fromProto(
      IdentityEntities.DecimalEnumAttributeDefinition res) {
    return new DecimalEnumAttributeDescriptor(
        res.getDisplayName(),
        res.getId(),
        res.getDescription(),
        res.getRequired(),
        res.getEnumList());
  }

  public IdentityEntities.DecimalEnumAttributeDefinition toProto() {
    return IdentityEntities.DecimalEnumAttributeDefinition.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .addAllEnum(this.enumeration)
        .build();
  }
}
