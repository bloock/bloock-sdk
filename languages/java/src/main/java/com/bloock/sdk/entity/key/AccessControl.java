package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.BloockAuthenticityEntities;
import com.bloock.sdk.bridge.proto.BloockKeysEntities;

/**
 * Represents access control information, including Time-based One-Time Password
 * (TOTP) and secret-based access.
 */
public class AccessControl {
    AccessControlTotp accessControlTotp;
    AccessControlSecret accessControlSecret;

    /**
     * Constructs AccessControl object from an AccessControlTotp object.
     * 
     * @param accessControlTotp
     */
    public AccessControl(AccessControlTotp accessControlTotp) {
        this.accessControlTotp = accessControlTotp;
    }

    /**
     * Constructs AccessControl object from an AccessControlSecret object.
     * 
     * @param accessControlSecret
     */
    public AccessControl(AccessControlSecret accessControlSecret) {
        this.accessControlSecret = accessControlSecret;
    }

    public BloockKeysEntities.AccessControl toProto() {
        BloockKeysEntities.AccessControl.Builder builder = BloockKeysEntities.AccessControl.newBuilder();

        if (this.accessControlTotp != null) {
            builder.setAccessControlTotp(this.accessControlTotp.toProto());
        }

        if (this.accessControlSecret != null) {
            builder.setAccessControlSecret(this.accessControlSecret.toProto());
        }

        return builder.build();
    }
}
