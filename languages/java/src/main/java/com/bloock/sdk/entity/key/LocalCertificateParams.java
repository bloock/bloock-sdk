package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents the parameters for generating a local certificate.
 */
public class LocalCertificateParams {
  KeyType keyType;
  SubjectCertificateParams subject;
  String password;
  int expiration;

  /**
   * Constructs an LocalCertificateParams object with the specified parameters.
   * 
   * @param keyType
   * @param subject
   * @param password
   * @param expirationMonths
   */
  public LocalCertificateParams(
      KeyType keyType, SubjectCertificateParams subject, String password, int expirationMonths) {
    this.keyType = keyType;
    this.subject = subject;
    this.password = password;
    this.expiration = expirationMonths;
  }

  public static LocalCertificateParams fromProto(BloockKeysEntities.LocalCertificateParams params) {
    return new LocalCertificateParams(
        KeyType.fromProto(params.getKeyType()),
        new SubjectCertificateParams(
            params.getSubject().getCommonName(),
            params.getSubject().getOrganization(),
            params.getSubject().getOrganizationalUnit(),
            params.getSubject().getLocation(),
            params.getSubject().getState(),
            params.getSubject().getCountry()),
        params.getPassword(),
        params.getExpiration());
  }

  public BloockKeysEntities.LocalCertificateParams toProto() {
    BloockKeysEntities.LocalCertificateParams.Builder params = BloockKeysEntities.LocalCertificateParams.newBuilder()
        .setKeyType(this.keyType.toProto())
        .setSubject(this.subject.toProto())
        .setPassword(this.password)
        .setExpiration(this.expiration);

    return params.build();
  }
}
