package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.BloockRecordEntities;
import com.bloock.sdk.entity.integrity.Proof;

/**
 * Represents details related to the integrity of a record, including hash and
 * proof.
 */
public class IntegrityDetails {
  String hash;
  Proof proof;

  /**
   * Constructs a IntegrityDetails object with the specified parameters.
   * 
   * @param hash
   * @param proof
   */
  IntegrityDetails(String hash, Proof proof) {
    this.hash = hash;
    this.proof = proof;
  }

  /**
   * Gets the hash of the record.
   * 
   * @return
   */
  public String getHash() {
    return hash;
  }

  /**
   * Gets the proof of the record.
   * 
   * @return
   */
  public Proof getProof() {
    return proof;
  }

  public static IntegrityDetails fromProto(BloockRecordEntities.IntegrityDetails details) {
    Proof proof = null;
    if (details.hasProof()) {
      proof = Proof.fromProto(details.getProof());
    }
    return new IntegrityDetails(details.getHash(), proof);
  }

  public BloockRecordEntities.IntegrityDetails toProto() {
    return BloockRecordEntities.IntegrityDetails.newBuilder()
        .setHash(hash)
        .setProof(proof.toProto())
        .build();
  }
}
