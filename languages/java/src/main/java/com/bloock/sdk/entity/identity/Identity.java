package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class Identity {
    private final String mnemonic;
    private final String key;
    private final String privateKey;

    public Identity(String mnemonic, String key, String privateKey) {
        this.mnemonic = mnemonic;
        this.key = key;
        this.privateKey = privateKey;
    }

    public static Identity fromProto(IdentityEntities.Identity res) {
        return new Identity(res.getMnemonic(), res.getKey(), res.getPrivateKey());
    }

    public IdentityEntities.Identity toProto() {
        return IdentityEntities.Identity.newBuilder()
                .setMnemonic(this.mnemonic)
                .setKey(this.key)
                .setPrivateKey(this.privateKey)
                .build();
    }

    public String getMnemonic() {
        return mnemonic;
    }

    public String getKey() {
        return key;
    }

    public String getPrivateKey() {
        return privateKey;
    }
}
