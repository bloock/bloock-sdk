import * as identityEntitiesProto from "../../bridge/proto/bloock_identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with a decimal enum value.
 */
export class DecimalEnumAttributeDescriptor extends AttributeDescriptor {
  enumeration: number[];

  /**
   * Constructs an DecimalEnumAttributeDescriptor object with the specified parameters.
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
    enumeration: number[]
  ) {
    super(displayName, technicalName, description, required);
    this.enumeration = enumeration;
  }

  public toProto(): identityEntitiesProto.DecimalEnumAttributeDefinition {
    return identityEntitiesProto.DecimalEnumAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required,
      enum: this.enumeration
    });
  }

  static fromProto(
    r: identityEntitiesProto.DecimalEnumAttributeDefinition
  ): DecimalEnumAttributeDescriptor {
    return new DecimalEnumAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required,
      r.enum
    );
  }
}
