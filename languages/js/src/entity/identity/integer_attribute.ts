import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with an integer value.
 */
export class IntegerAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.IntegerAttribute {
    return identityEntitiesProto.IntegerAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.IntegerAttribute
  ): IntegerAttribute {
    return new IntegerAttribute(r.id, r.value);
  }
}
