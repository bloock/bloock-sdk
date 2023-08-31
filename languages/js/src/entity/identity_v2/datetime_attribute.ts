import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

export class DateTimeAttribute extends Attribute<Date> {
  public toProto(): identityEntitiesProto.DateTimeAttributeV2 {
    return identityEntitiesProto.DateTimeAttributeV2.fromPartial({
      id: this.id,
      value: this.value.toISOString()
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttributeV2
  ): DateTimeAttribute {
    return new DateTimeAttribute(r.id, new Date(r.value));
  }
}
