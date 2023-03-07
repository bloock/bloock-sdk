import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class DateTimeAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateTimeAttributeDefinition {
    return identityEntitiesProto.DateTimeAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttributeDefinition
  ): DateTimeAttributeDescriptor {
    return new DateTimeAttributeDescriptor(r.displayName, r.id, r.description);
  }
}
