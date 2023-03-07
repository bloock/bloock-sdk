package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class Identity {
    private String mnemonic;
    private String key;
    private String privateKey;

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
}
