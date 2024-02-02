package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

/**
 * Represents an attribute with a boolean value.
 */
public class BooleanAttribute extends Attribute<Boolean> {
  /**
   * Creates a new BooleanAttribute instance with the provided key and value.
   * @param id
   * @param value
   */
  public BooleanAttribute(String id, boolean value) {
    super(id, value);
  }

  public static BooleanAttribute fromProto(IdentityEntitiesV2.BooleanAttributeV2 res) {
    return new BooleanAttribute(res.getId(), res.getValue());
  }

  public IdentityEntitiesV2.BooleanAttributeV2 toProto() {
    return IdentityEntitiesV2.BooleanAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
