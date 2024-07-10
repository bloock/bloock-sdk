package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.BloockIdentityEntities;

/**
 * Represents the proof associated with a credential, including signature and
 * sparse merkle tree proof.
 */
public class CredentialProof {
  private final String signatureProof;
  private final String sparseMtProof;

  /**
   * Constructs an CredentialProof object with the specified parameters.
   * 
   * @param signatureProof
   * @param sparseMtProof
   */
  public CredentialProof(String signatureProof, String sparseMtProof) {
    this.signatureProof = signatureProof;
    this.sparseMtProof = sparseMtProof;
  }

  public static CredentialProof fromProto(BloockIdentityEntities.CredentialProof res) {
    return new CredentialProof(res.getSignatureProof(), res.getSparseMtProof());
  }

  public BloockIdentityEntities.CredentialProof toProto() {
    BloockIdentityEntities.CredentialProof.Builder builder = BloockIdentityEntities.CredentialProof.newBuilder();
    if (!this.signatureProof.isEmpty()) {
      builder.setSignatureProof(this.signatureProof);
    }

    if (!this.sparseMtProof.isEmpty()) {
      builder.setSparseMtProof(this.sparseMtProof);
    }

    return builder.build();
  }

  /**
   * Retrieve signature proof with string format
   * 
   * @return
   */
  public String getSignatureProof() {
    return signatureProof;
  }

  /**
   * Retrieve sparse merkle tree proof with string format
   * 
   * @return
   */
  public String getSparseMtProof() {
    return sparseMtProof;
  }
}
