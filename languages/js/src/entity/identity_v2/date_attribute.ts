import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a date value, including its key and formatted value.
 */
export class DateAttribute extends Attribute<Date> {
  public toProto(): identityEntitiesProto.DateAttributeV2 {
    return identityEntitiesProto.DateAttributeV2.fromPartial({
      id: this.id,
      value: this.value.toISOString().split("T")[0]
    });
  }

  static fromProto(r: identityEntitiesProto.DateAttributeV2): DateAttribute {
    return new DateAttribute(r.id, new Date(r.value!));
  }
}
