import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for a boolean attribute.
 */
export class BooleanAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.BooleanAttributeDefinition {
    return identityEntitiesProto.BooleanAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttributeDefinition
  ): BooleanAttributeDescriptor {
    return new BooleanAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
