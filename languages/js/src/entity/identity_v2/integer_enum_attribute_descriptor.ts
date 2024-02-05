import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { AttributeDescriptor } from "./attribute_descriptor";

/**
 * Represents a descriptor for an attribute with an integer enum value.
 */
export class IntegerEnumAttributeDescriptor extends AttributeDescriptor {
  enumeration: number[];

  /**
   * Constructs an IntegerEnumAttributeDescriptor object with the specified parameters.
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

  public toProto(): identityEntitiesProto.IntegerEnumAttributeDefinitionV2 {
    return identityEntitiesProto.IntegerEnumAttributeDefinitionV2.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      required: this.required,
      enum: this.enumeration
    });
  }

  static fromProto(
    r: identityEntitiesProto.IntegerEnumAttributeDefinitionV2
  ): IntegerEnumAttributeDescriptor {
    return new IntegerEnumAttributeDescriptor(
      r.displayName,
      r.id,
      r.description,
      r.required,
      r.enum
    );
  }
}
