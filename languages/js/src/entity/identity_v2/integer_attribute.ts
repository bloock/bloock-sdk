import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with an integer value.
 */
export class IntegerAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.IntegerAttributeV2 {
    return identityEntitiesProto.IntegerAttributeV2.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.IntegerAttributeV2
  ): IntegerAttribute {
    return new IntegerAttribute(r.id, r.value);
  }
}
