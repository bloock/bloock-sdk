package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.KeysEntities;

/**
 * Represents access control information, including Time-based One-Time Password (TOTP) and secret-based access.
 */
public class AccessControl {
    AccessControlTotp accessControlTotp;
    AccessControlSecret accessControlSecret;

    /**
     * Constructs AccessControl object from an AccessControlTotp object.
     * @param accessControlTotp
     */
    public AccessControl(AccessControlTotp accessControlTotp) {
        this.accessControlTotp = accessControlTotp;
    }

    /**
     * Constructs AccessControl object from an AccessControlSecret object.
     * @param accessControlSecret
     */
    public AccessControl(AccessControlSecret accessControlSecret) {
        this.accessControlSecret = accessControlSecret;
    }

    public KeysEntities.AccessControl toProto() {
        KeysEntities.AccessControl.Builder builder = KeysEntities.AccessControl.newBuilder();

        if (this.accessControlTotp != null) {
            builder.setAccessControlTotp(this.accessControlTotp.toProto());
        }

        if (this.accessControlSecret != null) {
            builder.setAccessControlSecret(this.accessControlSecret.toProto());
        }

        return builder.build();
    }
}
