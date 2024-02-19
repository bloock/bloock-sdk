import * as identityEntitiesProto from "../../bridge/proto/identity_entities";
import { Credential } from "./credential";

/**
 * Represents a receipt for a credential, including the credential itself, its ID, and type.
 */
export class CredentialReceipt {
  credential: Credential;
  credentialId: string;
  credentialType: string;

  /**
   * Constructs an CredentialReceipt object with the specified parameters.
   * @param credential 
   * @param credentialId 
   * @param credentialType 
   */
  constructor(
    credential: Credential,
    credentialId: string,
    credentialType: string
  ) {
    this.credential = credential;
    this.credentialId = credentialId;
    this.credentialType = credentialType;
  }

  public toProto(): identityEntitiesProto.CredentialReceipt {
    return identityEntitiesProto.CredentialReceipt.fromPartial({
      credential: this.credential.toProto(),
      credentialId: this.credentialId,
      credentialType: this.credentialType
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialReceipt
  ): CredentialReceipt {
    return new CredentialReceipt(
      Credential.fromProto(r.credential!),
      r.credentialId,
      r.credentialType
    );
  }
}
