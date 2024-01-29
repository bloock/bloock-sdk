package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

public class AccessControlTotp {
    String code;

    public AccessControlTotp(String code) {
        this.code = code;
    }

    public KeysEntities.AccessControlTotp toProto() {
        KeysEntities.AccessControlTotp.Builder builder = KeysEntities.AccessControlTotp.newBuilder();

        builder.setCode(this.code);

        return builder.build();
    }
}
