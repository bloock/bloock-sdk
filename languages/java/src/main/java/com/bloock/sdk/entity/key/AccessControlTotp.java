package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents a Time-based One-Time Password
 * (<a href="https://datatracker.ietf.org/doc/html/rfc6238">TOTP</a>) code used
 * for access control.
 */
public class AccessControlTotp {
    String code;

    /**
     * Constructs an AccessControlTotp object with the specified parameters.
     * 
     * @param code
     */
    public AccessControlTotp(String code) {
        this.code = code;
    }

    public BloockKeysEntities.AccessControlTotp toProto() {
        BloockKeysEntities.AccessControlTotp.Builder builder = BloockKeysEntities.AccessControlTotp.newBuilder();

        builder.setCode(this.code);

        return builder.build();
    }
}
