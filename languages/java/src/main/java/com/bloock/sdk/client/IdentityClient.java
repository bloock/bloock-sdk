package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.identity.*;

public class IdentityClient {
  private Bridge bridge;
  private ConfigData configData;

  public IdentityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public IdentityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public com.bloock.sdk.entity.identity.Identity createIdentity() throws Exception {
    Identity.CreateIdentityRequest request = Identity.CreateIdentityRequest.newBuilder()
            .setConfigData(this.configData)
            .build();

    Identity.CreateIdentityResponse response = bridge.getIdentity().createIdentity(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return com.bloock.sdk.entity.identity.Identity.fromProto(response.getIdentity());
  }

  public com.bloock.sdk.entity.identity.Identity loadIdentity(String mnemonic) throws Exception {
    Identity.LoadIdentityRequest request = Identity.LoadIdentityRequest.newBuilder()
            .setConfigData(this.configData)
            .setMnemonic(mnemonic)
            .build();

    Identity.LoadIdentityResponse response = bridge.getIdentity().loadIdentity(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return com.bloock.sdk.entity.identity.Identity.fromProto(response.getIdentity());
  }

  public SchemaBuilder buildSchema(String displayName, String technicalName) throws Exception {
    return new SchemaBuilder(displayName, technicalName, this.configData);
  }

  public Schema getSchema(String id) throws Exception {
    Identity.GetSchemaRequest request = Identity.GetSchemaRequest.newBuilder()
            .setConfigData(this.configData)
            .setId(id)
            .build();

    Identity.GetSchemaResponse response = bridge.getIdentity().getSchema(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Schema.fromProto(response.getSchema());
  }

  public CredentialOfferBuilder buildOffer(String schemaId, String holderKey) throws Exception {
    return new CredentialOfferBuilder(schemaId, holderKey, this.configData);
  }

  public Credential redeemOffer(CredentialOffer credentialOffer, String holderPrivateKey) throws Exception {
    Identity.CredentialOfferRedeemRequest request = Identity.CredentialOfferRedeemRequest.newBuilder()
            .setConfigData(this.configData)
            .setCredentialOffer(credentialOffer.toProto())
            .setIdentityPrivateKey(holderPrivateKey)
            .build();

    Identity.CredentialOfferRedeemResponse response = bridge.getIdentity().credentialOfferRedeem(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Credential.fromProto(response.getCredential());
  }

  public CredentialVerification verifyCredential(Credential credential) throws Exception {
    Identity.VerifyCredentialRequest request = Identity.VerifyCredentialRequest.newBuilder()
            .setConfigData(this.configData)
            .setCredential(credential.toProto())
            .build();

    Identity.VerifyCredentialResponse response = bridge.getIdentity().verifyCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialVerification.fromProto(response.getResult());
  }

  public long revokeCredential(Credential credential) throws Exception {
    Identity.RevokeCredentialRequest request = Identity.RevokeCredentialRequest.newBuilder()
            .setConfigData(this.configData)
            .setCredential(credential.toProto())
            .build();

    Identity.RevokeCredentialResponse response = bridge.getIdentity().revokeCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getResult().getTimestamp();
  }

}
