import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class BooleanAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.BooleanAttributeDefinitionV2 {
    return identityEntitiesProto.BooleanAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.BooleanAttributeDefinitionV2
  ): BooleanAttributeDescriptor {
    return new BooleanAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
