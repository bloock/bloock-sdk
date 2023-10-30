package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.identity.*;

public class IdentityLegacyClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public IdentityLegacyClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public IdentityLegacyClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public com.bloock.sdk.entity.identity.Identity createIdentity() throws Exception {
    Identity.CreateIdentityRequest request = Identity.CreateIdentityRequest.newBuilder().setConfigData(this.configData)
        .build();

    Identity.CreateIdentityResponse response = bridge.getIdentity().createIdentity(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return com.bloock.sdk.entity.identity.Identity.fromProto(response.getIdentity());
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public SchemaBuilder buildSchema(String displayName, String technicalName) throws Exception {
    return new SchemaBuilder(displayName, technicalName, this.configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public Schema getSchema(String id) throws Exception {
    Identity.GetSchemaRequest request = Identity.GetSchemaRequest.newBuilder().setConfigData(this.configData).setId(id)
        .build();

    Identity.GetSchemaResponse response = bridge.getIdentity().getSchema(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Schema.fromProto(response.getSchema());
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public CredentialBuilder buildCredential(String schemaId, String holderKey) throws Exception {
    return new CredentialBuilder(schemaId, holderKey, this.configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public CredentialOffer getOffer(String id) throws Exception {
    Identity.GetOfferRequest request = Identity.GetOfferRequest.newBuilder().setConfigData(this.configData).setId(id)
        .build();

    Identity.GetOfferResponse response = bridge.getIdentity().getOffer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialOffer.fromProto(response.getOffer());
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public CredentialOffer waitOffer(String offerId) throws Exception {
    Identity.WaitOfferRequest request = Identity.WaitOfferRequest.newBuilder()
        .setConfigData(this.configData)
        .setOfferId(offerId)
        .build();

    Identity.WaitOfferResponse response = bridge.getIdentity().waitOffer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialOffer.fromProto(response.getOffer());
  }

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public Credential redeemOffer(CredentialOffer credentialOffer, String holderPrivateKey)
      throws Exception {
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
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

  /**
   * @deprecated Will be deleted in future versions. Use IdentityV2Client function
   *             instead.
   */
  @Deprecated
  public boolean revokeCredential(Credential credential) throws Exception {
    Identity.RevokeCredentialRequest request = Identity.RevokeCredentialRequest.newBuilder()
        .setConfigData(this.configData)
        .setCredential(credential.toProto())
        .build();

    Identity.RevokeCredentialResponse response = bridge.getIdentity().revokeCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getResult().getSuccess();
  }
}
