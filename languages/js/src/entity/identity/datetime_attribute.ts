import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

export class DateTimeAttribute extends Attribute<number> {
  public toProto(): identityEntitiesProto.DateTimeAttribute {
    return identityEntitiesProto.DateTimeAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttribute
  ): DateTimeAttribute {
    return new DateTimeAttribute(r.id, r.value);
  }
}
