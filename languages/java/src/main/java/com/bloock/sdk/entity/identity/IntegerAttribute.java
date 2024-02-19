package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an attribute with an integer value.
 */
public class IntegerAttribute extends Attribute<Long> {
  /**
   * Creates a new IntegerAttribute instance with the provided key and value.
   * @param id
   * @param value
   */
  public IntegerAttribute(String id, Long value) {
    super(id, value);
  }

  public static IntegerAttribute fromProto(IdentityEntities.IntegerAttribute res) {
    return new IntegerAttribute(res.getId(), res.getValue());
  }

  public IdentityEntities.IntegerAttribute toProto() {
    return IdentityEntities.IntegerAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
