package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents an attribute with a decimal value.
 */
public class DecimalAttribute extends Attribute<Double> {
  /**
   * Creates a new DecimalAttribute instance with the provided key and value.
   * 
   * @param id
   * @param value
   */
  public DecimalAttribute(String id, double value) {
    super(id, value);
  }

  public static DecimalAttribute fromProto(BloockIdentityEntities.DecimalAttribute res) {
    return new DecimalAttribute(res.getId(), res.getValue());
  }

  public BloockIdentityEntities.DecimalAttribute toProto() {
    return BloockIdentityEntities.DecimalAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
