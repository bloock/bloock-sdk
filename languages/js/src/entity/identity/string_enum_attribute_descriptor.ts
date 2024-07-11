import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a string enum value.
 */
export class StringEnumAttributeDescriptor extends AttributeDescriptor {
  enumeration: string[];

  /**
   * Constructs an StringEnumAttributeDescriptor object with the specified parameters.
   * @param displayName
   * @param technicalName
   * @param description
   * @param required
   * @param enumeration
   */
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

  public toProto(): identityEntitiesProto.StringEnumAttributeDefinition {
    return identityEntitiesProto.StringEnumAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required,
      enum: this.enumeration
    });
  }

  static fromProto(
    r: identityEntitiesProto.StringEnumAttributeDefinition
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
