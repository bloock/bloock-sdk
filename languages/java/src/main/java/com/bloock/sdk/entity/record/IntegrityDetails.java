package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.entity.integrity.Proof;

public class IntegrityDetails {
  String hash;
  Proof proof;

  IntegrityDetails(String hash, Proof proof) {
    this.hash = hash;
    this.proof = proof;
  }

  public String getHash() {
    return hash;
  }

  public Proof getProof() {
    return proof;
  }

  public static IntegrityDetails fromProto(RecordEntities.IntegrityDetails details) {
    Proof proof = null;
    if (details.hasProof()) {
      proof = Proof.fromProto(details.getProof());
    }
    return new IntegrityDetails(details.getHash(), proof);
  }

  public RecordEntities.IntegrityDetails toProto() {
    return RecordEntities.IntegrityDetails.newBuilder()
        .setHash(hash)
        .setProof(proof.toProto())
        .build();
  }
}
