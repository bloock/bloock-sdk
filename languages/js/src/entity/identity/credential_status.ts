import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

export class CredentialStatus {
  id: string;
  revocationNonce: number;
  type: string;

  constructor(id: string, revocationNonce: number, type: string) {
    this.id = id;
    this.revocationNonce = revocationNonce;
    this.type = type;
  }

  public toProto(): identityEntitiesProto.CredentialStatus {
    return identityEntitiesProto.CredentialStatus.fromPartial({
      id: this.id,
      revocationNonce: this.revocationNonce,
      type: this.type
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialStatus
  ): CredentialStatus {
    return new CredentialStatus(r.id, r.revocationNonce, r.type);
  }
}
