package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.config.Config;
import java.util.List;

public class Credential {
  private final List<String> context;
  private final String id;
  private final List<String> type;
  private final String issuanceDate;
  private final String expiration;
  private final String credentialSubject;
  private final CredentialStatus credentialStatus;
  private final String issuer;
  private final CredentialSchema credentialSchema;
  private final CredentialProof proof;

  public Credential(
      List<String> context,
      String id,
      List<String> type,
      String issuanceDate,
      String expiration,
      String credentialSubject,
      CredentialStatus credentialStatus,
      String issuer,
      CredentialSchema credentialSchema,
      CredentialProof proof) {
    this.context = context;
    this.id = id;
    this.type = type;
    this.issuanceDate = issuanceDate;
    this.expiration = expiration;
    this.credentialSubject = credentialSubject;
    this.credentialStatus = credentialStatus;
    this.issuer = issuer;
    this.credentialSchema = credentialSchema;
    this.proof = proof;
  }

  public static Credential fromProto(IdentityEntitiesV2.CredentialV2 res) {
    return new Credential(
        res.getContextList(),
        res.getId(),
        res.getTypeList(),
        res.getIssuanceDate(),
        res.getExpiration(),
        res.getCredentialSubject(),
        CredentialStatus.fromProto(res.getCredentialStatus()),
        res.getIssuer(),
        CredentialSchema.fromProto(res.getCredentialSchema()),
        CredentialProof.fromProto(res.getProof()));
  }

  public IdentityEntitiesV2.CredentialV2 toProto() {
    return IdentityEntitiesV2.CredentialV2.newBuilder()
        .addAllContext(this.context)
        .setId(this.id)
        .addAllType(this.type)
        .setIssuanceDate(this.issuanceDate)
        .setExpiration(this.expiration)
        .setCredentialSubject(this.credentialSubject)
        .setCredentialStatus(this.credentialStatus.toProto())
        .setIssuer(this.issuer)
        .setCredentialSchema(this.credentialSchema.toProto())
        .setProof(this.proof.toProto())
        .build();
  }

  public static Credential fromJson(String json) throws Exception {
    Bridge bridge = new Bridge();

    IdentityV2.CredentialFromJsonRequestV2 req =
        IdentityV2.CredentialFromJsonRequestV2.newBuilder()
            .setConfigData(Config.newConfigDataDefault())
            .setJson(json)
            .build();

    IdentityV2.CredentialFromJsonResponseV2 response =
        bridge.getIdentityV2().credentialFromJson(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Credential.fromProto(response.getCredential());
  }

  public String toJson() throws Exception {
    Bridge bridge = new Bridge();

    com.bloock.sdk.bridge.proto.IdentityV2.CredentialToJsonRequestV2 req =
        com.bloock.sdk.bridge.proto.IdentityV2.CredentialToJsonRequestV2.newBuilder()
            .setConfigData(Config.newConfigDataDefault())
            .setCredential(this.toProto())
            .build();

    IdentityV2.CredentialToJsonResponseV2 response = bridge.getIdentityV2().credentialToJson(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getJson();
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

  public String getExpiration() {
    return expiration;
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
