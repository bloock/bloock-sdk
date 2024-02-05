import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a decimal value.
 */
export class DecimalAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DecimalAttributeDefinitionV2 {
    return identityEntitiesProto.DecimalAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DecimalAttributeDefinitionV2
  ): DecimalAttributeDescriptor {
    return new DecimalAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
