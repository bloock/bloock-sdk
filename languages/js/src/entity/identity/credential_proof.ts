import * as identityEntitiesProto from "../../bridge/proto/identity_entities";

/**
 * Represents the proof associated with a credential, including signature and sparse merkle tree proof.
 */
export class CredentialProof {
  signatureProof: string;
  sparseMtProof?: string;

  /**
   * Constructs an CredentialProof object with the specified parameters.
   * @param signatureProof 
   * @param sparseMtProof 
   */
  constructor(signatureProof: string, sparseMtProof?: string) {
    this.signatureProof = signatureProof;
    this.sparseMtProof = sparseMtProof;
  }

  public toProto(): identityEntitiesProto.CredentialProof {
    return identityEntitiesProto.CredentialProof.fromPartial({
      signatureProof: this.signatureProof,
      sparseMtProof: this.sparseMtProof
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialProof
  ): CredentialProof {
    return new CredentialProof(r.signatureProof, r.sparseMtProof);
  }
}
