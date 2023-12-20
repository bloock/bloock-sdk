package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public enum EncryptionAlg {
  AES256GCM,
  AES256GCM_M,
  RSA,
  RSA_M,
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
