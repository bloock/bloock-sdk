package com.bloock.sdk.entity.key;

public class KeyPair {
    String publicKey;
    String privateKey;

    KeyPair(String publicKey, String privateKey) {
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }

    public String getPublicKey() {
        return publicKey;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}
