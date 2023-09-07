package com.bloock.sdk.entity.identity_v2;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.AuthenticityEntities.Signer;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.IdentityEntitiesV2;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CredentialBuilder {
  private final String schemaId;
  private final String issuerDid;
  private final String holderKey;
  private final Long expiration;
  private final int version;
  private final String apiManagedHost;
  private final ArrayList<com.bloock.sdk.bridge.proto.IdentityEntitiesV2.ProofType> proofTypes;
  private Signer signer;
  private final Config.ConfigData configData;

  private final List<IdentityEntitiesV2.BooleanAttributeV2> booleanAttributes;
  private final List<IdentityEntitiesV2.DateAttributeV2> dateAttributes;
  private final List<IdentityEntitiesV2.DateTimeAttributeV2> datetimeAttributes;
  private final List<IdentityEntitiesV2.StringAttributeV2> stringAttributes;
  private final List<IdentityEntitiesV2.IntegerAttributeV2> integerAttributes;
  private final List<IdentityEntitiesV2.DecimalAttributeV2> decimalAttributes;

  public CredentialBuilder(
      String schemaId,
      String issuerDid,
      String holderKey,
      Long expiration,
      int version,
      String apiManagedHost,
      Config.ConfigData configData) {
    this.schemaId = schemaId;
    this.issuerDid = issuerDid;
    this.holderKey = holderKey;
    this.expiration = expiration;
    this.version = version;
    this.apiManagedHost = apiManagedHost;
    this.signer = null;
    this.configData = configData;

    this.proofTypes = new ArrayList<>();
    this.booleanAttributes = new ArrayList<>();
    this.dateAttributes = new ArrayList<>();
    this.datetimeAttributes = new ArrayList<>();
    this.stringAttributes = new ArrayList<>();
    this.integerAttributes = new ArrayList<>();
    this.decimalAttributes = new ArrayList<>();
  }

  public CredentialBuilder withStringAttribute(String key, String value) {
    this.stringAttributes.add(new StringAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withIntegerAttribute(String key, Long value) {
    this.integerAttributes.add(new IntegerAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withDecimalAttribute(String key, double value) {
    this.decimalAttributes.add(new DecimalAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withBooleanAttribute(String key, boolean value) {
    this.booleanAttributes.add(new BooleanAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withDateAttribute(String key, LocalDate value) {
    this.dateAttributes.add(new DateAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withDatetimeAttribute(String key, LocalDateTime value) {
    this.datetimeAttributes.add(new DatetimeAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withSigner(com.bloock.sdk.entity.authenticity.Signer signer) {
    this.signer = signer.toProto();
    return this;
  }

  public CredentialBuilder WithProofType(ArrayList<ProofType> proof) {
    for (ProofType proofType : proof) {
      this.proofTypes.add(proofType.toProto());
    }
    return this;
  }

  public CredentialReceipt build() throws Exception {
    Bridge bridge = new Bridge();

    IdentityV2.CreateCredentialRequestV2 req =
        IdentityV2.CreateCredentialRequestV2.newBuilder()
            .setConfigData(this.configData)
            .setSchemaId(this.schemaId)
            .setIssuerDid(this.issuerDid)
            .setHolderDid(this.holderKey)
            .setExpiration(this.expiration)
            .setVersion(this.version)
            .setApiManagedHost(this.apiManagedHost)
            .setSigner(this.signer)
            .addAllProofType(this.proofTypes)
            .addAllStringAttributes(this.stringAttributes)
            .addAllIntegerAttributes(this.integerAttributes)
            .addAllDecimalAttributes(this.decimalAttributes)
            .addAllBooleanAttributes(this.booleanAttributes)
            .addAllDateAttributes(this.dateAttributes)
            .addAllDatetimeAttributes(this.datetimeAttributes)
            .build();

    IdentityV2.CreateCredentialResponseV2 response = bridge.getIdentityV2().createCredential(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialReceipt.fromProto(response.getCredentialReceipt());
  }
}
