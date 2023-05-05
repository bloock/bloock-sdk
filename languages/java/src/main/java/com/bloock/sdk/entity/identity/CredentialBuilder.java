package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.IdentityEntities;
import com.bloock.sdk.bridge.proto.Shared;
import java.util.ArrayList;
import java.util.List;

public class CredentialBuilder {
  private final String schemaId;
  private final String holderKey;
  private final Config.ConfigData configData;

  private final List<IdentityEntities.BooleanAttribute> booleanAttributes;
  private final List<IdentityEntities.DateAttribute> dateAttributes;
  private final List<IdentityEntities.DateTimeAttribute> datetimeAttributes;
  private final List<IdentityEntities.StringAttribute> stringAttributes;
  private final List<IdentityEntities.NumberAttribute> numberAttributes;

  public CredentialBuilder(String schemaId, String holderKey, Config.ConfigData configData) {
    this.schemaId = schemaId;
    this.holderKey = holderKey;
    this.configData = configData;

    this.booleanAttributes = new ArrayList<>();
    this.dateAttributes = new ArrayList<>();
    this.datetimeAttributes = new ArrayList<>();
    this.stringAttributes = new ArrayList<>();
    this.numberAttributes = new ArrayList<>();
  }

  public CredentialBuilder withBooleanAttribute(String key, boolean value) {
    this.booleanAttributes.add(new BooleanAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withDateAttribute(String key, Long value) {
    this.dateAttributes.add(new DateAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withDatetimeAttribute(String key, Long value) {
    this.datetimeAttributes.add(new DatetimeAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withStringAttribute(String key, String value) {
    this.stringAttributes.add(new StringAttribute(key, value).toProto());
    return this;
  }

  public CredentialBuilder withNumberAttribute(String key, Long value) {
    this.numberAttributes.add(new NumberAttribute(key, value).toProto());
    return this;
  }

  public CredentialReceipt build() throws Exception {
    Bridge bridge = new Bridge();

    Identity.CreateCredentialRequest req =
        Identity.CreateCredentialRequest.newBuilder()
            .setConfigData(this.configData)
            .setSchemaId(this.schemaId)
            .setHolderKey(this.holderKey)
            .addAllBooleanAttributes(this.booleanAttributes)
            .addAllDateAttributes(this.dateAttributes)
            .addAllDatetimeAttributes(this.datetimeAttributes)
            .addAllStringAttributes(this.stringAttributes)
            .addAllNumberAttributes(this.numberAttributes)
            .build();

    Identity.CreateCredentialResponse response = bridge.getIdentity().createCredential(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialReceipt.fromProto(response.getCredentialReceipt());
  }
}
