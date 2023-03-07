import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class NumberAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.NumberAttributeDefinition {
    return identityEntitiesProto.NumberAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.NumberAttributeDefinition
  ): NumberAttributeDescriptor {
    return new NumberAttributeDescriptor(r.displayName, r.id, r.description);
  }
}
