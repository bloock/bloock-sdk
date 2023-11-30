package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public enum EncryptionAlg {
  AES256GCM,
  RSA,
  UNRECOGNIZED;

  public static EncryptionAlg fromProto(EncryptionEntities.EncryptionAlg alg) {
    return switch (alg) {
      case A256GCM -> EncryptionAlg.AES256GCM;
      case RSA -> EncryptionAlg.RSA;
      default -> EncryptionAlg.UNRECOGNIZED;
    };
  }
  
  public EncryptionEntities.EncryptionAlg toProto() {
    return switch (this) {
      case AES256GCM -> EncryptionEntities.EncryptionAlg.A256GCM;
      case RSA -> EncryptionEntities.EncryptionAlg.RSA;
      case UNRECOGNIZED -> EncryptionEntities.EncryptionAlg.UNRECOGNIZED;
    };
  }
}
