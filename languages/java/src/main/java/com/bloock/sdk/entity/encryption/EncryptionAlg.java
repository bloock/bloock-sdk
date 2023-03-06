package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;

public enum EncryptionAlg {
    AES256GCM,
    RSA,
    ECIES,
    UNRECOGNIZED;

    public static EncryptionAlg fromProto(EncryptionEntities.EncryptionAlg alg) {
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
