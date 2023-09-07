import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

export class BooleanAttribute extends Attribute<boolean> {
  public toProto(): identityEntitiesProto.BooleanAttributeV2 {
    return identityEntitiesProto.BooleanAttributeV2.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttributeV2
  ): BooleanAttribute {
    return new BooleanAttribute(r.id, r.value);
  }
}
