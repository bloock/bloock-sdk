package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.proto.IdentityEntities;

import java.util.List;

public class CredentialBody {
    private final List<String> context;
    private final String id;
    private final List<String> type;
    private final String issuanceDate;
    private final String credentialSubject;
    private final CredentialStatus credentialStatus;
    private final String issuer;
    private final CredentialSchema credentialSchema;
    private final CredentialProof proof;

    public CredentialBody(List<String> context, String id, List<String> type, String issuanceDate, String credentialSubject, CredentialStatus credentialStatus, String issuer, CredentialSchema credentialSchema, CredentialProof proof) {
        this.context = context;
        this.id = id;
        this.type = type;
        this.issuanceDate = issuanceDate;
        this.credentialSubject = credentialSubject;
        this.credentialStatus = credentialStatus;
        this.issuer = issuer;
        this.credentialSchema = credentialSchema;
        this.proof = proof;
    }

    public static CredentialBody fromProto(IdentityEntities.CredentialBody res) {
        return new CredentialBody(res.getContextList(), res.getId(), res.getTypeList(), res.getIssuanceDate(), res.getCredentialSubject(), CredentialStatus.fromProto(res.getCredentialStatus()), res.getIssuer(), CredentialSchema.fromProto(res.getCredentialSchema()), CredentialProof.fromProto(res.getProof()));
    }

    public IdentityEntities.CredentialBody toProto() {
        return IdentityEntities.CredentialBody.newBuilder()
                .addAllContext(this.context)
                .setId(this.id)
                .addAllType(this.type)
                .setIssuanceDate(this.issuanceDate)
                .setCredentialSubject(this.credentialSubject)
                .setCredentialStatus(this.credentialStatus.toProto())
                .setIssuer(this.issuer)
                .setCredentialSchema(this.credentialSchema.toProto())
                .setProof(this.proof.toProto())
                .build();
    }

    public List<String> getContext() {
        return context;
    }

    public String getId() {
        return id;
    }

    public List<String> getType() {
        return type;
    }

    public String getIssuanceDate() {
        return issuanceDate;
    }

    public String getCredentialSubject() {
        return credentialSubject;
    }

    public CredentialStatus getCredentialStatus() {
        return credentialStatus;
    }

    public String getIssuer() {
        return issuer;
    }

    public CredentialSchema getCredentialSchema() {
        return credentialSchema;
    }

    public CredentialProof getProof() {
        return proof;
    }
}
