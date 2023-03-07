import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

export class DateAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DateAttribute {
    return identityEntitiesProto.DateAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(r: identityEntitiesProto.DateAttribute): DateAttribute {
    return new DateAttribute(r.id, r.value);
  }
}
