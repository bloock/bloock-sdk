package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
import java.util.List;

/**
 * Represents a descriptor for an attribute with an integer enum value.
 */
public class IntegerEnumAttributeDescriptor extends AttributeDescriptor {
  private List<Long> enumeration;

  /**
   * Constructs an IntegerEnumAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   */
  public IntegerEnumAttributeDescriptor(
      String displayName,
      String technicalName,
      String description,
      Boolean required,
      List<Long> enumeration) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public static IntegerEnumAttributeDescriptor fromProto(
      IdentityEntitiesV2.IntegerEnumAttributeDefinitionV2 res) {
    return new IntegerEnumAttributeDescriptor(
        res.getDisplayName(),
        res.getId(),
        res.getDescription(),
        res.getRequired(),
        res.getEnumList());
  }

  public IdentityEntitiesV2.IntegerEnumAttributeDefinitionV2 toProto() {
    return IdentityEntitiesV2.IntegerEnumAttributeDefinitionV2.newBuilder()
        .setDisplayName(this.displayName)
        .setId(this.technicalName)
        .setDescription(this.description)
        .setRequired(this.required)
        .addAllEnum(this.enumeration)
        .build();
  }
}
