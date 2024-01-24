import * as identityEntitiesProto from "../../bridge/proto/identity_entities_v2";

export class CredentialProof {
  signatureProof: string;
  sparseMtProof?: string;

  constructor(signatureProof: string, sparseMtProof?: string) {
    this.signatureProof = signatureProof;
    this.sparseMtProof = sparseMtProof;
  }

  public toProto(): identityEntitiesProto.CredentialProofV2 {
    return identityEntitiesProto.CredentialProofV2.fromPartial({
      signatureProof: this.signatureProof,
      sparseMtProof: this.sparseMtProof
    });
  }

  static fromProto(
    r: identityEntitiesProto.CredentialProofV2
  ): CredentialProof {
    return new CredentialProof(r.signatureProof, r.sparseMtProof);
  }
}
