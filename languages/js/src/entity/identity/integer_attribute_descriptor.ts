import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with an integer value.
 */
export class IntegerAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.IntegerAttributeDefinition {
    return identityEntitiesProto.IntegerAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.IntegerAttributeDefinition
  ): IntegerAttributeDescriptor {
    return new IntegerAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
