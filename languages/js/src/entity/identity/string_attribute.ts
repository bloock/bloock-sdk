import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

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
