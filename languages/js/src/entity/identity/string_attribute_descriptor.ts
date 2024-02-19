import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a string value.
 */
export class StringAttributeDescriptor extends AttributeDescriptor {
  constructor(
    displayName: string,
    technicalName: string,
    description: string,
    required: boolean
  ) {
    super(displayName, technicalName, description, required);
  }

  public toProto(): identityEntitiesProto.StringAttributeDefinition {
    return identityEntitiesProto.StringAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringAttributeDefinition
  ): StringAttributeDescriptor {
    return new StringAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
