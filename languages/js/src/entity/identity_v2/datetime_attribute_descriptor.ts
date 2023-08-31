import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class DateTimeAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateTimeAttributeDefinitionV2 {
    return identityEntitiesProto.DateTimeAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateTimeAttributeDefinitionV2
  ): DateTimeAttributeDescriptor {
    return new DateTimeAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
