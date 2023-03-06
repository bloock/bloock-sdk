package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class AesEncrypter implements Encrypter {
    EncryptionAlg alg;
    EncrypterArgs args;

    public AesEncrypter(String password) {
        this.alg = EncryptionAlg.A256GCM;
        this.args = new EncrypterArgs(password);
    }

    @Override
    public EncryptionEntities.Encrypter toProto() {
        return EncryptionEntities.Encrypter.newBuilder()
                .setAlg(this.alg)
                .setArgs(this.args.toProto())
                .build();
    }
}
