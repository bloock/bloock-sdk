import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a string value.
 */
export class StringAttribute extends Attribute<string> {
  public toProto(): identityEntitiesProto.StringAttribute {
    return identityEntitiesProto.StringAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(r: identityEntitiesProto.StringAttribute): StringAttribute {
    return new StringAttribute(r.id, r.value);
  }
}
