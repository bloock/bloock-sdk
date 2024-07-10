package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.BloockRecordEntities;

/**
 * Represents details related to the encryption of a record, including
 * algorithm, key, and subject.
 */
public class EncryptionDetails {
  String alg;
  String key;
  String subject;

  /**
   * Constructs a EncryptionDetails object with the specified parameters.
   * 
   * @param alg
   * @param key
   * @param subject
   */
  EncryptionDetails(String alg, String key, String subject) {
    this.alg = alg;
    this.key = key;
    this.subject = subject;
  }

  /**
   * Gets the algorithm of the encryption.
   * 
   * @return
   */
  public String getAlg() {
    return alg;
  }

  /**
   * Gets the public key of the encryption.
   * 
   * @return
   */
  public String getKey() {
    return key;
  }

  /**
   * Gets the subject of the subject.
   * 
   * @return
   */
  public String getSubject() {
    return subject;
  }

  public static EncryptionDetails fromProto(BloockRecordEntities.EncryptionDetails details) {
    String alg = null;
    if (details.hasAlg()) {
      alg = details.getAlg();
    }

    String key = null;
    if (details.hasKey()) {
      key = details.getKey();
    }

    String subject = null;
    if (details.hasSubject()) {
      subject = details.getSubject();
    }

    return new EncryptionDetails(alg, key, subject);
  }

  public BloockRecordEntities.EncryptionDetails toProto() {
    return BloockRecordEntities.EncryptionDetails.newBuilder()
        .setAlg(alg)
        .setKey(key)
        .setSubject(subject)
        .build();
  }
}
