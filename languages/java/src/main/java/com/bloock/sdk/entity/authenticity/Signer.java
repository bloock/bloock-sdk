package com.bloock.sdk.entity.authenticity;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.entity.key.*;

/**
 * Represents a signer with various key types and additional configurations.
 */
public class Signer {

  LocalKey localKey;
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;
  LocalCertificate localCertificate;
  AccessControl accessControl;

  HashAlg hashAlg;

  /**
   * Creates a Signer instance with a local key.
   * @param localKey
   */
  public Signer(LocalKey localKey) {
    this.localKey = localKey;
  }

  /**
   * Creates a Signer instance with a local key and specified hash algorithm.
   * @param localKey
   * @param hashAlg
   */
  public Signer(LocalKey localKey, HashAlg hashAlg) {
    this.localKey = localKey;
    this.hashAlg = hashAlg;
  }

  /**
   * Creates a Signer instance with a managed key.
   * @param managedKey
   */
  public Signer(ManagedKey managedKey) {
    this.managedKey = managedKey;
  }

  /**
   * Creates a Signer instance with a managed key, specified hash algorithm, and access control configuration.
   * @param managedKey
   * @param hashAlg
   * @param accessControl
   */
  public Signer(ManagedKey managedKey, HashAlg hashAlg, AccessControl accessControl) {
    this.managedKey = managedKey;
    this.hashAlg = hashAlg;
    this.accessControl = accessControl;
  }

  /**
   * Creates a Signer instance with a managed certificate.
   * @param managedCertificate
   */
  public Signer(ManagedCertificate managedCertificate) {
    this.managedCertificate = managedCertificate;
  }

  /**
   * Creates a Signer instance with a managed certificate, specified hash algorithm, and access control configuration.
   * @param managedCertificate
   * @param hashAlg
   * @param accessControl
   */
  public Signer(ManagedCertificate managedCertificate, HashAlg hashAlg, AccessControl accessControl) {
    this.managedCertificate = managedCertificate;
    this.hashAlg = hashAlg;
    this.accessControl = accessControl;
  }

  /**
   * Creates a Signer instance with a local certificate.
   * @param localCertificate
   */
  public Signer(LocalCertificate localCertificate) {
    this.localCertificate = localCertificate;
  }

  /**
   * Creates a Signer instance with a local certificate and specified hash algorithm.
   * @param localCertificate
   * @param hashAlg
   */
  public Signer(LocalCertificate localCertificate, HashAlg hashAlg) {
    this.localCertificate = localCertificate;
    this.hashAlg = hashAlg;
  }

  public AuthenticityEntities.Signer toProto() {
    AuthenticityEntities.Signer.Builder builder = AuthenticityEntities.Signer.newBuilder();

    if (this.localKey != null) {
      builder.setLocalKey(this.localKey.toProto());
    }

    if (this.managedKey != null) {
      builder.setManagedKey(this.managedKey.toProto());
    }

    if (this.managedCertificate != null) {
      builder.setManagedCertificate(this.managedCertificate.toProto());
    }

    if (this.localCertificate != null) {
      builder.setLocalCertificate(this.localCertificate.toProto());
    }

    if (this.hashAlg != null) {
      builder.setHashAlg(this.hashAlg.toProto());
    }

    if (this.accessControl != null) {
      builder.setAccessControl(this.accessControl.toProto());
    }

    return builder.build();
  }
}
