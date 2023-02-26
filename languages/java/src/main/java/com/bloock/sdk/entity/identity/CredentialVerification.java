package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialVerification {
    private Long timestamp;
    private String issuer;
    private Long revocation;

    public CredentialVerification(Long timestamp, String issuer, Long revocation) {
        this.timestamp = timestamp;
        this.issuer = issuer;
        this.revocation = revocation;
    }

    public IdentityEntities.CredentialVerification toProto() {
        return IdentityEntities.CredentialVerification.newBuilder()
                .setTimestamp(this.timestamp)
                .setIssuer(this.issuer)
                .setRevocation(this.revocation)
                .build();
    }

    public static CredentialVerification fromProto(IdentityEntities.CredentialVerification res) {
        return new CredentialVerification(res.getTimestamp(), res.getIssuer(), res.getRevocation());
    }
}