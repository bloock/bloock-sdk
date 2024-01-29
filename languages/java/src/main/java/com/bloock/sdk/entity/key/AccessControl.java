package com.bloock.sdk.entity.key;

import com.bloock.sdk.bridge.proto.AuthenticityEntities;
import com.bloock.sdk.bridge.proto.KeysEntities;

public class AccessControl {
    AccessControlTotp accessControlTotp;
    AccessControlSecret accessControlSecret;

    public AccessControl(AccessControlTotp accessControlTotp) {
        this.accessControlTotp = accessControlTotp;
    }

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
