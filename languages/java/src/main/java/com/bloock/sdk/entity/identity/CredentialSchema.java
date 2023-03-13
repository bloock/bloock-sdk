package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialSchema {
    private String id;
    private String type;

    public CredentialSchema(String id, String type) {
        this.id = id;
        this.type = type;
    }

    public static CredentialSchema fromProto(IdentityEntities.CredentialSchema res) {
        return new CredentialSchema(res.getId(), res.getType());
    }

    public IdentityEntities.CredentialSchema toProto() {
        return IdentityEntities.CredentialSchema.newBuilder()
                .setId(this.id)
                .setType(this.type)
                .build();
    }

}
