import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { AttributeDescriptor } from "./attribute_descriptor";

export class MultichoiceAttributeDescriptor extends AttributeDescriptor {
  values: string[];

  constructor(
    displayName: string,
    technicalName: string,
    values: string[],
    description?: string
  ) {
    super(displayName, technicalName, description);
    this.values = values;
  }

  public toProto(): identityEntitiesProto.MultiChoiceAttributeDefinition {
    return identityEntitiesProto.MultiChoiceAttributeDefinition.fromPartial({
      displayName: this.displayName,
      id: this.technicalName,
      description: this.description,
      allowedValues: this.values
    });
  }

  static fromProto(
    r: identityEntitiesProto.MultiChoiceAttributeDefinition
  ): MultichoiceAttributeDescriptor {
    return new MultichoiceAttributeDescriptor(
      r.displayName,
      r.id,
      r.allowedValues,
      r.description
    );
  }
}
