import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class DateAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateAttributeDefinition {
    return identityEntitiesProto.DateAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateAttributeDefinition
  ): DateAttributeDescriptor {
    return new DateAttributeDescriptor(r.displayName, r.id, r.description);
  }
}
