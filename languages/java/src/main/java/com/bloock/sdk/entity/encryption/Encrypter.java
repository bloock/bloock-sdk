package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.entity.key.*;

/**
 * Represents an encryption configuration with various key types and access control.
 */
public class Encrypter {
  LocalKey localKey;
  ManagedKey managedKey;
  ManagedCertificate managedCertificate;
  LocalCertificate localCertificate;
  AccessControl accessControl;

  /**
   * Creates a new Encrypter instance with a local encryption key.
   * @param localKey
   */
  public Encrypter(LocalKey localKey) {
    this.localKey = localKey;
  }

  /**
   * Creates a new Encrypter instance with a managed encryption key and access control.
   * @param managedKey
   * @param accessControl
   */
  public Encrypter(ManagedKey managedKey, AccessControl accessControl) {
    this.managedKey = managedKey;
    this.accessControl = accessControl;
  }

  /**
   * Creates a new Encrypter instance with a local certificate for encryption.
   * @param managedCertificate
   * @param accessControl
   */
  public Encrypter(ManagedCertificate managedCertificate, AccessControl accessControl) {
    this.managedCertificate = managedCertificate;
    this.accessControl = accessControl;
  }

  /**
   * Creates a new Encrypter instance with a managed certificate for encryption and access control.
   * @param localCertificate
   */
  public Encrypter(LocalCertificate localCertificate) {
    this.localCertificate = localCertificate;
  }

  public EncryptionEntities.Encrypter toProto() {
    EncryptionEntities.Encrypter.Builder builder = EncryptionEntities.Encrypter.newBuilder();

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

    if (this.accessControl != null) {
      builder.setAccessControl(this.accessControl.toProto());
    }

    return builder.build();
  }
}
