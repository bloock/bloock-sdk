import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class DateAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.DateAttributeDefinitionV2 {
    return identityEntitiesProto.DateAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.DateAttributeDefinitionV2
  ): DateAttributeDescriptor {
    return new DateAttributeDescriptor(r.displayName, r.id, r.description, r.required);
  }
}
