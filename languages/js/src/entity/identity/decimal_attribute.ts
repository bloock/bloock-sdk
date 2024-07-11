import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a decimal value.
 */
export class DecimalAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DecimalAttribute {
    return identityEntitiesProto.DecimalAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.DecimalAttribute
  ): DecimalAttribute {
    return new DecimalAttribute(r.id, r.value);
  }
}
