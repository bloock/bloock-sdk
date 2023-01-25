package com.bloock.sdk.entity;

import com.bloock.sdk.bridge.proto.RecordOuterClass;

public enum EncryptionAlg {
    AES256GCM,
    RSA,
    ECIES,
    UNRECOGNIZED;

  public static EncryptionAlg fromProto(RecordOuterClass.EncryptionAlg alg) {
    switch (alg) {
            case A256GCM:
                return EncryptionAlg.AES256GCM;
            case RSA:
                return EncryptionAlg.RSA;
            case ECIES:
                return EncryptionAlg.ECIES;
            default:
                return EncryptionAlg.UNRECOGNIZED;
    }
  }
}