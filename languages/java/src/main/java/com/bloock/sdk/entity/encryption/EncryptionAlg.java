package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public enum EncryptionAlg {
  AES256GCM,
  RSA,
  UNRECOGNIZED;

  public static EncryptionAlg fromProto(EncryptionEntities.EncryptionAlg alg) {
    switch (alg) {
      case A256GCM:
        return EncryptionAlg.AES256GCM;
      case RSA:
        return EncryptionAlg.RSA;
      default:
        return EncryptionAlg.UNRECOGNIZED;
    }
  }

  public EncryptionEntities.EncryptionAlg toProto() {
    switch (this) {
      case AES256GCM:
        return EncryptionEntities.EncryptionAlg.A256GCM;
      case RSA:
        return EncryptionEntities.EncryptionAlg.RSA;
      default:
        return EncryptionEntities.EncryptionAlg.UNRECOGNIZED;
    }
  }
}
