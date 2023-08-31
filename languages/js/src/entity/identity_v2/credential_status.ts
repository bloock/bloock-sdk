import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class CredentialStatus {
  id: string;
  revocationNonce: number;
  type: string;

  constructor(id: string, revocationNonce: number, type: string) {
    this.id = id;
    this.revocationNonce = revocationNonce;
    this.type = type;
  }

  public toProto(): identityEntitiesProto.CredentialStatusV2 {
    return identityEntitiesProto.CredentialStatusV2.fromPartial({
      id: this.id,
      revocationNonce: this.revocationNonce,
      type: this.type
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialStatusV2
  ): CredentialStatus {
    return new CredentialStatus(r.id, r.revocationNonce, r.type);
  }
}
