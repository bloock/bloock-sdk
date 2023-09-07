import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";
import { Credential } from "../identity_v2/credential";

export class CredentialReceipt {
  credential: Credential;
  credentialId: string;
  credentialType: string;
  anchorId: number;

  constructor(
    credential: Credential,
    credentialId: string,
    credentialType: string,
    anchorId: number
  ) {
    this.credential = credential;
    this.credentialId = credentialId;
    this.credentialType = credentialType;
    this.anchorId = anchorId;
  }

  public toProto(): identityEntitiesProto.CredentialReceiptV2 {
    return identityEntitiesProto.CredentialReceiptV2.fromPartial({
      credential: this.credential.toProto(),
      credentialId: this.credentialId,
      credentialType: this.credentialType,
      anchorId: this.anchorId
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialReceiptV2
  ): CredentialReceipt {
    return new CredentialReceipt(
      Credential.fromProto(r.credential!),
      r.credentialId,
      r.credentialType,
      r.anchorId!
    );
  }
}
