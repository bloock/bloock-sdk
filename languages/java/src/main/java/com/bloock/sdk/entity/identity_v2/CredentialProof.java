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
    IdentityEntitiesV2.CredentialProofV2.Builder builder =
        IdentityEntitiesV2.CredentialProofV2.newBuilder();
    if (!this.singatureProof.isEmpty()) {
      builder.setSignatureProof(this.singatureProof);
    }

    if (!this.integrityProof.isEmpty()) {
      builder.setIntegrityProof(this.integrityProof);
    }

    if (!this.sparseMtProof.isEmpty()) {
      builder.setSparseMtProof(this.sparseMtProof);
    }

    return builder.build();
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
