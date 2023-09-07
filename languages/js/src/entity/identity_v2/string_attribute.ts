import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

export class StringAttribute extends Attribute<string> {
  public toProto(): identityEntitiesProto.StringAttributeV2 {
    return identityEntitiesProto.StringAttributeV2.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringAttributeV2
  ): StringAttribute {
    return new StringAttribute(r.id, r.value);
  }
}
