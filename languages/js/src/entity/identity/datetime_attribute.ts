import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

/**
 * Represents an attribute with a datetime value.
 */
export class DateTimeAttribute extends Attribute<Date> {
  public toProto(): identityEntitiesProto.DateTimeAttribute {
    return identityEntitiesProto.DateTimeAttribute.fromPartial({
      id: this.id,
      value: this.value.toISOString()
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttribute
  ): DateTimeAttribute {
    return new DateTimeAttribute(r.id, new Date(r.value));
  }
}
