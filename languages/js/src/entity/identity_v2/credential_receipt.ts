import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Credential } from "../identity_v2/credential";

export class CredentialReceipt {
  credential: Credential;
  credentialId: string;
  credentialType: string;

  constructor(
    credential: Credential,
    credentialId: string,
    credentialType: string
  ) {
    this.credential = credential;
    this.credentialId = credentialId;
    this.credentialType = credentialType;
  }

  public toProto(): identityEntitiesProto.CredentialReceiptV2 {
    return identityEntitiesProto.CredentialReceiptV2.fromPartial({
      credential: this.credential.toProto(),
      credentialId: this.credentialId,
      credentialType: this.credentialType
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialReceiptV2
  ): CredentialReceipt {
    return new CredentialReceipt(
      Credential.fromProto(r.credential!),
      r.credentialId,
      r.credentialType
    );
  }
}
