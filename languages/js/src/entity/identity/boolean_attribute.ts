import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a boolean value.
 */
export class BooleanAttribute extends Attribute<boolean> {
  public toProto(): identityEntitiesProto.BooleanAttribute {
    return identityEntitiesProto.BooleanAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttribute
  ): BooleanAttribute {
    return new BooleanAttribute(r.id, r.value);
  }
}
