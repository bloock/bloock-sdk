import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class StringAttributeDescriptor extends AttributeDescriptor {
  constructor(
    displayName: string,
    technicalName: string,
    description?: string
  ) {
    super(displayName, technicalName, description);
  }

  public toProto(): identityEntitiesProto.StringAttributeDefinition {
    return identityEntitiesProto.StringAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringAttributeDefinition
  ): StringAttributeDescriptor {
    return new StringAttributeDescriptor(r.displayName, r.id, r.description);
  }
}
