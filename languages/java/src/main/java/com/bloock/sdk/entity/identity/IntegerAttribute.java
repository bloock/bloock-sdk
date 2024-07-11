package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents an attribute with an integer value.
 */
public class IntegerAttribute extends Attribute<Long> {
  /**
   * Creates a new IntegerAttribute instance with the provided key and value.
   * 
   * @param id
   * @param value
   */
  public IntegerAttribute(String id, Long value) {
    super(id, value);
  }

  public static IntegerAttribute fromProto(BloockIdentityEntities.IntegerAttribute res) {
    return new IntegerAttribute(res.getId(), res.getValue());
  }

  public BloockIdentityEntities.IntegerAttribute toProto() {
    return BloockIdentityEntities.IntegerAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
