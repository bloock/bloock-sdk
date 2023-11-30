package com.bloock.sdk.entity.record;

import com.bloock.sdk.bridge.proto.RecordEntities;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.encryption.EncryptionAlg;

import java.util.List;
import java.util.stream.Collectors;

public class EncryptionDetails {
  EncryptionAlg alg;
  String key;
  String subject;

  EncryptionDetails(EncryptionAlg alg, String key, String subject) {
    this.alg = alg;
    this.key = key;
    this.subject = subject;
  }

  public EncryptionAlg getAlg() {
    return alg;
  }

  public String getKey() {
    return key;
  }

  public String getSubject() {
    return subject;
  }

  public static EncryptionDetails fromProto(RecordEntities.EncryptionDetails details) {
    EncryptionAlg alg = null;
    if (details.hasAlg()) {
      alg = EncryptionAlg.fromProto(details.getAlg());
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

  public RecordEntities.EncryptionDetails toProto() {
    return RecordEntities.EncryptionDetails.newBuilder()
        .setAlg(alg.toProto()).setKey(key).setSubject(subject)
        .build();
  }
}
