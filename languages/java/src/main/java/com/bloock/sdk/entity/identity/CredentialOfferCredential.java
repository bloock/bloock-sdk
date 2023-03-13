package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.integrity.Proof;

public class CredentialOfferCredential {
    private String id;
    private String description;

    public CredentialOfferCredential(String id, String description) {
        this.id = id;
        this.description = description;
    }

    public static CredentialOfferCredential fromProto(IdentityEntities.CredentialOfferBodyCredentials res) {
        return new CredentialOfferCredential(res.getId(), res.getDescription());
    }

    public IdentityEntities.CredentialOfferBodyCredentials toProto() {
        return IdentityEntities.CredentialOfferBodyCredentials.newBuilder()
                .setId(this.id)
                .setDescription(this.description)
                .build();
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }
}
