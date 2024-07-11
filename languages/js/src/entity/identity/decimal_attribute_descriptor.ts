import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a decimal value.
 */
export class DecimalAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DecimalAttributeDefinition {
    return identityEntitiesProto.DecimalAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DecimalAttributeDefinition
  ): DecimalAttributeDescriptor {
    return new DecimalAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
