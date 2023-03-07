import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

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
