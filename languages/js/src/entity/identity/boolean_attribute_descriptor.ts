import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class BooleanAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.BooleanAttributeDefinition {
    return identityEntitiesProto.BooleanAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttributeDefinition
  ): BooleanAttributeDescriptor {
    return new BooleanAttributeDescriptor(r.displayName, r.id, r.description);
  }
}
