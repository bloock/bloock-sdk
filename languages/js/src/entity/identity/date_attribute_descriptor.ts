import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for a date attribute, including its display name, ID, description, and required status.
 */
export class DateAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateAttributeDefinition {
    return identityEntitiesProto.DateAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateAttributeDefinition
  ): DateAttributeDescriptor {
    return new DateAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
