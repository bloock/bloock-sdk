package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.*;
import com.bloock.sdk.bridge.proto.BloockAuthenticityEntities.Signer;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Helps construct credentials by specifying various attributes.
 */
public class CredentialCoreBuilder {
  private final String schemaId;
  private final String issuerDid;
  private final String holderKey;
  private final Long expiration;
  private final int version;
  private BloockKeysEntities.Key key;
  private final BloockConfig.ConfigData configData;

  private final List<BloockIdentityEntities.BooleanAttribute> booleanAttributes;
  private final List<BloockIdentityEntities.DateAttribute> dateAttributes;
  private final List<BloockIdentityEntities.DateTimeAttribute> datetimeAttributes;
  private final List<BloockIdentityEntities.StringAttribute> stringAttributes;
  private final List<BloockIdentityEntities.IntegerAttribute> integerAttributes;
  private final List<BloockIdentityEntities.DecimalAttribute> decimalAttributes;

  /**
   * Creates a new CredentialCoreBuilder instance with the specified parameters.
   * 
   * @param issuer
   * @param schemaId
   * @param holderKey
   * @param expiration
   * @param version
   * @param configData
   */
  public CredentialCoreBuilder(
      Issuer issuer,
      String schemaId,
      String holderKey,
      Long expiration,
      int version,
      BloockConfig.ConfigData configData) {
    this.schemaId = schemaId;
    this.issuerDid = issuer.getDid().getDid();
    this.holderKey = holderKey;
    this.expiration = expiration;
    this.version = version;
    this.key = issuer.getKey().toProto();
    this.configData = configData;

    this.booleanAttributes = new ArrayList<>();
    this.dateAttributes = new ArrayList<>();
    this.datetimeAttributes = new ArrayList<>();
    this.stringAttributes = new ArrayList<>();
    this.integerAttributes = new ArrayList<>();
    this.decimalAttributes = new ArrayList<>();
  }

  /**
   * Adds a string attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withStringAttribute(String key, String value) {
    this.stringAttributes.add(new StringAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds an integer attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withIntegerAttribute(String key, Long value) {
    this.integerAttributes.add(new IntegerAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a decimal attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withDecimalAttribute(String key, double value) {
    this.decimalAttributes.add(new DecimalAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a boolean attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withBooleanAttribute(String key, boolean value) {
    this.booleanAttributes.add(new BooleanAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a date attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withDateAttribute(String key, LocalDate value) {
    this.dateAttributes.add(new DateAttribute(key, value).toProto());
    return this;
  }

  /**
   * Adds a datetime attribute to the CredentialBuilder.
   * 
   * @param key
   * @param value
   * @return
   */
  public CredentialCoreBuilder withDatetimeAttribute(String key, LocalDateTime value) {
    this.datetimeAttributes.add(new DatetimeAttribute(key, value).toProto());
    return this;
  }

  /**
   * Creates and returns a Credential using the specified attributes.
   * 
   * @return
   * @throws Exception
   */
  public CredentialReceipt build() throws Exception {
    Bridge bridge = new Bridge();

    BloockIdentityCore.CreateCoreCredentialRequest req = BloockIdentityCore.CreateCoreCredentialRequest.newBuilder()
        .setConfigData(this.configData)
        .setSchemaId(this.schemaId)
        .setIssuerDid(this.issuerDid)
        .setHolderDid(this.holderKey)
        .setExpiration(this.expiration)
        .setVersion(this.version)
        .setKey(this.key)
        .addAllStringAttributes(this.stringAttributes)
        .addAllIntegerAttributes(this.integerAttributes)
        .addAllDecimalAttributes(this.decimalAttributes)
        .addAllBooleanAttributes(this.booleanAttributes)
        .addAllDateAttributes(this.dateAttributes)
        .addAllDatetimeAttributes(this.datetimeAttributes)
        .build();

    BloockIdentityCore.CreateCoreCredentialResponse response = bridge.getIdentityCore().createCoreCredential(req);

    if (response.getError() != BloockShared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialReceipt.fromProto(response.getCredentialReceipt());
  }
}
