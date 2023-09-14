package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class ManagedCertificateParams {
  KeyType keyType;
  SubjectCertificateParams subject;
  int expiration;

  public ManagedCertificateParams(
      KeyType keyType, SubjectCertificateParams subject, int expirationMonths) {
    this.keyType = keyType;
    this.subject = subject;
    this.expiration = expirationMonths;
  }

  public static ManagedCertificateParams fromProto(KeysEntities.ManagedCertificateParams params) {
    return new ManagedCertificateParams(
        KeyType.fromProto(params.getKeyType()),
        new SubjectCertificateParams(params.getCn(), params.getC(), params.getOu(), params.getO()),
        params.getExpiration());
  }

  public KeysEntities.ManagedCertificateParams toProto() {
    KeysEntities.ManagedCertificateParams.Builder params =
        KeysEntities.ManagedCertificateParams.newBuilder()
            .setKeyType(this.keyType.toProto())
            .setCn(this.subject.getCn())
            .setC(this.subject.getC())
            .setOu(this.subject.getOu())
            .setO(this.subject.getO())
            .setExpiration(this.expiration);

    return params.build();
  }

  public KeyType getKeyType() {
    return keyType;
  }

  public SubjectCertificateParams getSubject() {
    return subject;
  }

  public int getExpiration() {
    return expiration;
  }
}
