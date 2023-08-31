import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

export class StringEnumAttributeDescriptor extends AttributeDescriptor {
  enumeration: string[];

  constructor(
    displayName: string,
    technicalName: string,
    description: string,
    required: boolean,
    enumeration: string[]
  ) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public toProto(): identityEntitiesProto.StringEnumAttributeDefinitionV2 {
    return identityEntitiesProto.StringEnumAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required,
      enum: this.enumeration
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringEnumAttributeDefinitionV2
  ): StringEnumAttributeDescriptor {
    return new StringEnumAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required,
      r.enum
    );
  }
}
