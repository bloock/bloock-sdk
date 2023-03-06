package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.Keys;

public class RsaKeyPair extends KeyPair {
    RsaKeyPair(String publicKey, String privateKey) {
        super(publicKey, privateKey);
    }

    public static RsaKeyPair fromProto(Keys.GenerateLocalKeyResponse keys) {
        return new RsaKeyPair(keys.getLocalKey().getKey(), keys.getLocalKey().getPrivateKey());
    }
}
