package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialOffer {
    private String json;

    public CredentialOffer(String json) {
        this.json = json;
    }

    public static CredentialOffer fromJson(String json) {
        return new CredentialOffer(json);
    }

    public static CredentialOffer fromProto(IdentityEntities.CredentialOffer res) {
        return new CredentialOffer(res.getJson());
    }

    public String toJson() {
        return this.json;
    }

    public IdentityEntities.CredentialOffer toProto() {
        return IdentityEntities.CredentialOffer.newBuilder()
                .setJson(this.json)
                .build();
    }
}
