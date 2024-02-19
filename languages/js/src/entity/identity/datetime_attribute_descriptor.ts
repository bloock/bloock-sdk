import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a datetime value.
 */
export class DateTimeAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateTimeAttributeDefinition {
    return identityEntitiesProto.DateTimeAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttributeDefinition
  ): DateTimeAttributeDescriptor {
    return new DateTimeAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
