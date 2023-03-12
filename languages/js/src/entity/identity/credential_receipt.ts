import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialReceipt {
  id: string;
  anchorId: number;

  constructor(id: string, anchorId: number) {
    this.id = id;
    this.anchorId = anchorId;
  }

  public toProto(): identityEntitiesProto.CredentialReceipt {
    return identityEntitiesProto.CredentialReceipt.fromPartial({
      id: this.id,
      anchorId: this.anchorId
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialReceipt
  ): CredentialReceipt {
    return new CredentialReceipt(r.id, r.anchorId);
  }
}
