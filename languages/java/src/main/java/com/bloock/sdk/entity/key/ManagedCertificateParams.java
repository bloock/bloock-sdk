package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents parameters for creating a managed certificate.
 */
public class ManagedCertificateParams {
  /**
   * Is the type of the key.
   */
  KeyType keyType;
  /**
   * Represents the subject details of the certificate.
   */
  SubjectCertificateParams subject;
  /**
   * Is the number of months until the certificate expiration.
   */
  int expiration;

  /**
   * Constructs a ManagedCertificateParams object with the specified parameters.
   * @param keyType
   * @param subject
   * @param expirationMonths
   */
  public ManagedCertificateParams(
      KeyType keyType, SubjectCertificateParams subject, int expirationMonths) {
    this.keyType = keyType;
    this.subject = subject;
    this.expiration = expirationMonths;
  }

  public static ManagedCertificateParams fromProto(KeysEntities.ManagedCertificateParams params) {
    return new ManagedCertificateParams(
        KeyType.fromProto(params.getKeyType()),
        new SubjectCertificateParams(
            params.getSubject().getCommonName(),
            params.getSubject().getOrganization(),
            params.getSubject().getOrganizationalUnit(),
            params.getSubject().getLocation(),
            params.getSubject().getState(),
            params.getSubject().getCountry()),
        params.getExpiration());
  }

  public KeysEntities.ManagedCertificateParams toProto() {
    KeysEntities.ManagedCertificateParams.Builder params =
        KeysEntities.ManagedCertificateParams.newBuilder()
            .setKeyType(this.keyType.toProto())
            .setSubject(this.subject.toProto())
            .setExpiration(this.expiration);

    return params.build();
  }

  /**
   * Gets the key type of the managed certificate params.
   * @return
   */
  public KeyType getKeyType() {
    return keyType;
  }

  /**
   * Gets the subject information of the managed certificate params.
   * @return
   */
  public SubjectCertificateParams getSubject() {
    return subject;
  }

  /**
   * Gets the expiration of the managed certificate params.
   * @return
   */
  public int getExpiration() {
    return expiration;
  }
}
