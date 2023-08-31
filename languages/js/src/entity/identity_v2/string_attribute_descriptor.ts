import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class StringAttributeDescriptor extends AttributeDescriptor {

  constructor(
    displayName: string,
    technicalName: string,
    description: string,
    required: boolean
  ) {
    super(displayName, technicalName, description, required);
  }

  public toProto(): identityEntitiesProto.StringAttributeDefinitionV2 {
    return identityEntitiesProto.StringAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringAttributeDefinitionV2
  ): StringAttributeDescriptor {
    return new StringAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required
    );
  }
}
