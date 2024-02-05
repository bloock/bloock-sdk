package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents a Time-based One-Time Password (<a href="https://datatracker.ietf.org/doc/html/rfc6238">TOTP</a>) code used for access control.
 */
public class AccessControlTotp {
    String code;

    /**
     * Constructs an AccessControlTotp object with the specified parameters.
     * @param code
     */
    public AccessControlTotp(String code) {
        this.code = code;
    }

    public KeysEntities.AccessControlTotp toProto() {
        KeysEntities.AccessControlTotp.Builder builder = KeysEntities.AccessControlTotp.newBuilder();

        builder.setCode(this.code);

        return builder.build();
    }
}
