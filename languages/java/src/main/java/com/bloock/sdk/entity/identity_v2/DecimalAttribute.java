package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

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

  public static DecimalAttribute fromProto(IdentityEntitiesV2.DecimalAttributeV2 res) {
    return new DecimalAttribute(res.getId(), res.getValue());
  }

  public IdentityEntitiesV2.DecimalAttributeV2 toProto() {
    return IdentityEntitiesV2.DecimalAttributeV2.newBuilder()
        .setId(this.id)
        .setValue(this.value)
        .build();
  }
}
