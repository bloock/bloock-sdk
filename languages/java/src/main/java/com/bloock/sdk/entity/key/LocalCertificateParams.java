package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class LocalCertificateParams {
  KeyType keyType;
  SubjectCertificateParams subject;
  String password;

  public LocalCertificateParams(
      KeyType keyType, SubjectCertificateParams subject, String password) {
    this.keyType = keyType;
    this.subject = subject;
    this.password = password;
  }

  public static LocalCertificateParams fromProto(KeysEntities.LocalCertificateParams params) {
    return new LocalCertificateParams(
        KeyType.fromProto(params.getKeyType()),
        new SubjectCertificateParams(
            params.getSubject().getCommonName(),
            params.getSubject().getOrganization(),
            params.getSubject().getOrganizationalUnit(),
            params.getSubject().getLocation(),
            params.getSubject().getState(),
            params.getSubject().getCountry()),
        params.getPassword());
  }

  public KeysEntities.LocalCertificateParams toProto() {
    KeysEntities.LocalCertificateParams.Builder params =
        KeysEntities.LocalCertificateParams.newBuilder()
            .setKeyType(this.keyType.toProto())
            .setSubject(this.subject.toProto())
            .setPassword(this.password);

    return params.build();
  }
}
