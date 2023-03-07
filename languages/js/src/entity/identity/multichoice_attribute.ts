import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Attribute } from "./attribute";

export class MultichoiceAttribute extends Attribute<string> {
  public toProto(): identityEntitiesProto.MultiChoiceAttribute {
    return identityEntitiesProto.MultiChoiceAttribute.fromPartial({
      id: this.id,
      value: this.value
    });
  }

  static fromProto(
    r: identityEntitiesProto.MultiChoiceAttribute
  ): MultichoiceAttribute {
    return new MultichoiceAttribute(r.id, r.value);
  }
}
