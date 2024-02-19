import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a date value, including its key and formatted value.
 */
export class DateAttribute extends Attribute<Date> {
  public toProto(): identityEntitiesProto.DateAttribute {
    return identityEntitiesProto.DateAttribute.fromPartial({
      id: this.id,
      value: this.value.toISOString().split("T")[0]
    });
  }

  static fromProto(r: identityEntitiesProto.DateAttribute): DateAttribute {
    return new DateAttribute(r.id, new Date(r.value!));
  }
}
