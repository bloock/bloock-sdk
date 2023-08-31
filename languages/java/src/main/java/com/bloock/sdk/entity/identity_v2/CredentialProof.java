package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;

public class CredentialProof {
  private final String singatureProof;
  private final String integrityProof;
  private final String sparseMtProof;

  public CredentialProof(String signatureProof, String integrityProof, String sparseMtProof) {
    this.singatureProof = signatureProof;
    this.integrityProof = integrityProof;
    this.sparseMtProof = sparseMtProof;
  }

  public static CredentialProof fromProto(IdentityEntitiesV2.CredentialProofV2 res) {
    return new CredentialProof(
        res.getSignatureProof(), res.getIntegrityProof(), res.getSparseMtProof());
  }

  public IdentityEntitiesV2.CredentialProofV2 toProto() {
    return IdentityEntitiesV2.CredentialProofV2.newBuilder()
        .setSignatureProof(this.singatureProof)
        .setIntegrityProof(this.integrityProof)
        .setSparseMtProof(this.sparseMtProof)
        .build();
  }

  public String getSignatureProof() {
    return singatureProof;
  }

  public String getIntegrityProof() {
    return integrityProof;
  }

  public String getSparseMtProof() {
    return sparseMtProof;
  }
}
