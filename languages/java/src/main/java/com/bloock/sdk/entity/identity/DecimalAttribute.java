package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

/**
 * Represents an attribute with a decimal value.
 */
public class DecimalAttribute extends Attribute<Double> {
  /**
   * Creates a new DecimalAttribute instance with the provided key and value.
   * @param id
   * @param value
   */
  public DecimalAttribute(String id, double value) {
    super(id, value);
  }

  public static DecimalAttribute fromProto(IdentityEntities.DecimalAttribute res) {
    return new DecimalAttribute(res.getId(), res.getValue());
  }

  public IdentityEntities.DecimalAttribute toProto() {
    return IdentityEntities.DecimalAttribute.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
