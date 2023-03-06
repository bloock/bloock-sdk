package com.bloock.sdk.entity.encryption;

import com.bloock.sdk.bridge.proto.EncryptionEntities;
import com.bloock.sdk.bridge.proto.EncryptionEntities.EncryptionAlg;

public class RsaDecrypter implements Decrypter {
    EncryptionAlg alg;
    DecrypterArgs args;

    public RsaDecrypter(String publicKey) {
        this.alg = EncryptionAlg.RSA;
        this.args = new DecrypterArgs(publicKey);
    }

    @Override
    public EncryptionEntities.Decrypter toProto() {
        return EncryptionEntities.Decrypter.newBuilder()
                .setAlg(this.alg)
                .setArgs(this.args.toProto())
                .build();
    }
}
