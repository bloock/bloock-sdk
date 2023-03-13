package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

public class CredentialVerification {
    private final Long timestamp;
    private final String issuer;
    private final Long revocation;

    public CredentialVerification(Long timestamp, String issuer, Long revocation) {
        this.timestamp = timestamp;
        this.issuer = issuer;
        this.revocation = revocation;
    }

    public static CredentialVerification fromProto(IdentityEntities.CredentialVerification res) {
        return new CredentialVerification(res.getTimestamp(), res.getIssuer(), res.getRevocation());
    }

    public IdentityEntities.CredentialVerification toProto() {
        return IdentityEntities.CredentialVerification.newBuilder()
                .setTimestamp(this.timestamp)
                .setIssuer(this.issuer)
                .setRevocation(this.revocation)
                .build();
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public String getIssuer() {
        return issuer;
    }

    public Long getRevocation() {
        return revocation;
    }
}
