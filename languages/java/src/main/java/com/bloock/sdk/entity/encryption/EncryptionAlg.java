package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

/**
 * Represents encryption algorithm types.
 */
public enum EncryptionAlg {
  /**
   * Represents the AES-256-GCM encryption algorithm.
   */
  AES256GCM,
  /**
   * Represents the AES-256-GCM with managed key encryption algorithm.
   */
  AES256GCM_M,
  /**
   * Represents the RSA encryption algorithm.
   */
  RSA,
  /**
   * Represents the RSA with managed key encryption algorithm.
   */
  RSA_M,
  /**
   * Represents an unrecognized encryption algorithm.
   */
  UNRECOGNIZED;

  public static EncryptionAlg fromProto(EncryptionEntities.EncryptionAlg alg) {
    switch (alg) {
      case A256GCM:
        return EncryptionAlg.AES256GCM;
      case A256GCM_M:
        return EncryptionAlg.AES256GCM_M;
      case RSA:
        return EncryptionAlg.RSA;
      case RSA_M:
        return EncryptionAlg.RSA_M;
      default:
        return EncryptionAlg.UNRECOGNIZED;
    }
  }

  public EncryptionEntities.EncryptionAlg toProto() {
    switch (this) {
      case AES256GCM:
        return EncryptionEntities.EncryptionAlg.A256GCM;
      case AES256GCM_M:
        return EncryptionEntities.EncryptionAlg.A256GCM_M;
      case RSA:
        return EncryptionEntities.EncryptionAlg.RSA;
      case RSA_M:
        return EncryptionEntities.EncryptionAlg.RSA_M;
      default:
        return EncryptionEntities.EncryptionAlg.UNRECOGNIZED;
    }
  }
}
