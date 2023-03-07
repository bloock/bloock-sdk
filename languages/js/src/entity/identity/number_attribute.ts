import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

export class NumberAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.NumberAttribute {
    return identityEntitiesProto.NumberAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(r: identityEntitiesProto.NumberAttribute): NumberAttribute {
    return new NumberAttribute(r.id, r.value);
  }
}
