package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class Credential {
    private String json;

    public Credential(String json) {
        this.json = json;
    }

    public String toJson() {
        return this.json;
    }

    public static Credential fromJson(String json) {
        return new Credential(json);
    }

    public IdentityEntities.Credential toProto() {
        return IdentityEntities.Credential.newBuilder()
                .setJson(this.json)
                .build();
    }

    public static Credential fromProto(IdentityEntities.Credential res) {
        return new Credential(res.getJson());
    }
}
