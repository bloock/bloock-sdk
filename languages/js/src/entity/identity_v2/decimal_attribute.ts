import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a decimal value.
 */
export class DecimalAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DecimalAttributeV2 {
    return identityEntitiesProto.DecimalAttributeV2.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.DecimalAttributeV2
  ): DecimalAttribute {
    return new DecimalAttribute(r.id, r.value);
  }
}
