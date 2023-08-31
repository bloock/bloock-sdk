import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class IntegerAttributeDescriptor extends AttributeDescriptor {
  public toProto(): identityEntitiesProto.IntegerAttributeDefinitionV2 {
    return identityEntitiesProto.IntegerAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.IntegerAttributeDefinitionV2
  ): IntegerAttributeDescriptor {
    return new IntegerAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
