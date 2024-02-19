package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Identity;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.identity.*;
import com.bloock.sdk.entity.key.Key;

/**
 * Represents a client for interacting with the <a href="https://dashboard.bloock.com/login">Bloock Identity service</a>.
 */
public class IdentityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new instance of the IdentityClient with default configuration.
   */
  public IdentityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new instance of the IdentityClient with the provided configuration.
   * @param configData
   */
  public IdentityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Creates a new holder identity.
   * @param issuerKey
   * @param didParams
   * @return
   * @throws Exception
   */
  public Holder createHolder(Key holderKey, DidType didType) throws Exception {
    Identity.CreateHolderRequest.Builder builder =
        Identity.CreateHolderRequest.newBuilder()
            .setKey(holderKey.toProto())
            .setDidType(didType.toProto())
            .setConfigData(this.configData);

    Identity.CreateHolderRequest request = builder.build();

    Identity.CreateHolderResponse response = bridge.getIdentity().createHolder(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new Holder(response.getDid(), didType, holderKey);
  }

  /**
   * Creates a new issuer on the Bloock Identity service.
   * @param issuerKey
   * @param publishInterval
   * @param name
   * @param description
   * @param image
   * @return
   * @throws Exception
   */
  public Issuer createIssuer(
      Key issuerKey,
      PublishIntervalParams publishInterval,
      String name,
      String description,
      String image)
      throws Exception {
    return createIssuer(issuerKey, publishInterval, new DidType(), name, description, image);
  }

  /**
   * Creates a new issuer on the Bloock Identity service.
   * @param issuerKey
   * @param publishInterval
   * @param issuerParams
   * @param name
   * @param description
   * @param image
   * @return
   * @throws Exception
   */
  public Issuer createIssuer(
      Key issuerKey,
      PublishIntervalParams publishInterval,
      DidType didType,
      String name,
      String description,
      String image)
      throws Exception {
    Identity.CreateIssuerRequest.Builder builder =
        Identity.CreateIssuerRequest.newBuilder()
            .setKey(issuerKey.toProto())
            .setDidType(didType.toProto())
            .setPublishInterval(publishInterval.toProto())
            .setConfigData(this.configData);

    if (name != null) {
      builder.setName(name);
    }

    if (description != null) {
      builder.setDescription(description);
    }

    if (image != null) {
      builder.setImage(image);
    }

    Identity.CreateIssuerRequest request = builder.build();

    Identity.CreateIssuerResponse response = bridge.getIdentity().createIssuer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new Issuer(response.getDid(), didType, issuerKey);
  }

  /**
   * Gets the issuer based on the issuer key and DID type.
   * @param issuerKey
   * @return
   * @throws Exception
   */
  public Issuer importIssuer(Key issuerKey) throws Exception {
    return importIssuer(issuerKey, new DidType());
  }

  /**
   * Gets the issuer based on the issuer key and DID type.
   * @param issuerKey
   * @param issuerParams
   * @return
   * @throws Exception
   */
  public Issuer importIssuer(Key issuerKey, DidType didType) throws Exception {
    Identity.ImportIssuerRequest request =
        Identity.ImportIssuerRequest.newBuilder()
            .setKey(issuerKey.toProto())
            .setDidType(didType.toProto())
            .setConfigData(this.configData)
            .build();

    Identity.ImportIssuerResponse response = bridge.getIdentity().importIssuer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new Issuer(response.getDid(), didType, issuerKey);
  }

  /**
   * Creates a new schema builder for defining a schema on the Bloock Identity service.
   * @param displayName
   * @param schemaType
   * @param version
   * @param description
   * @return
   * @throws Exception
   */
  public SchemaBuilder buildSchema(
      String displayName, String schemaType, String version, String description) throws Exception {
    return new SchemaBuilder(displayName, schemaType, version, description, this.configData);
  }

  /**
   * Gets a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
   * @param id
   * @return
   * @throws Exception
   */
  public Schema getSchema(String id) throws Exception {
    Identity.GetSchemaRequest request =
        Identity.GetSchemaRequest.newBuilder().setConfigData(this.configData).setId(id).build();

    Identity.GetSchemaResponse response = bridge.getIdentity().getSchema(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Schema.fromProto(response.getSchema());
  }

  /**
   * Creates a new credential builder for defining a credential on the Bloock Identity service.
   * @param schemaId
   * @param issuerDid
   * @param holderDid
   * @param expiration
   * @param version
   * @return
   * @throws Exception
   */
  public CredentialBuilder buildCredential(
      Issuer issuer, String schemaId, String holderDid, Long expiration, int version)
      throws Exception {
    return new CredentialBuilder(
        issuer, schemaId, holderDid, expiration, version, this.configData);
  }

  /**
   * Publishes the state of an issuer on the Bloock Identity service.
   * @param issuerDid
   * @param signer
   * @return
   * @throws Exception
   */
  public IssuerStateReceipt forcePublishIssuerState(Issuer issuer) throws Exception {
    Identity.ForcePublishIssuerStateRequest req =
        Identity.ForcePublishIssuerStateRequest.newBuilder()
            .setConfigData(this.configData)
            .setIssuerDid(issuer.getDid().getDid())
            .setKey(issuer.getKey().toProto())
            .build();

    Identity.ForcePublishIssuerStateResponse response = bridge.getIdentity().forcePublishIssuerState(req);

    if (response.getError() != Shared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return IssuerStateReceipt.fromProto(response.getStateReceipt());
  }

  /**
   * Gets the proof of a credential on the Bloock Identity service.
   * @param issuerDid
   * @param credentialId
   * @return
   * @throws Exception
   */
  public CredentialProof getCredentialProof(String issuerDid, String credentialId)
      throws Exception {
    Identity.GetCredentialProofRequest request =
        Identity.GetCredentialProofRequest.newBuilder()
            .setCredentialId(credentialId)
            .setIssuerDid(issuerDid)
            .setConfigData(this.configData)
            .build();

    Identity.GetCredentialProofResponse response =
        bridge.getIdentity().getCredentialProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialProof.fromProto(response.getProof());
  }

  /**
   * Revokes a credential on the Bloock Identity service.
   * @param credential
   * @param signer
   * @return
   * @throws Exception
   */
  public boolean revokeCredential(Credential credential, Issuer issuer) throws Exception {
    Identity.RevokeCredentialRequest request =
        Identity.RevokeCredentialRequest.newBuilder()
            .setConfigData(this.configData)
            .setCredential(credential.toProto())
            .setKey(issuer.getKey().toProto())
            .build();

    Identity.RevokeCredentialResponse response =
        bridge.getIdentity().revokeCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getResult().getSuccess();
  }

  /**
   * Creates a new verification session on the identity managed API provided.
   * @param proofRequest
   * @return
   * @throws Exception
   */
  public VerificationReceipt createVerification(String proofRequest) throws Exception {
    Identity.CreateVerificationRequest request =
        Identity.CreateVerificationRequest.newBuilder()
            .setConfigData(this.configData)
            .setProofRequest(proofRequest)
            .build();

    Identity.CreateVerificationResponse response =
        bridge.getIdentity().createVerification(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return VerificationReceipt.fromProto(response.getResult());
  }

  /**
   * Waits for the completion of a verification session on the identity managed API provided.
   * @param sessionID
   * @param timeout
   * @return
   * @throws Exception
   */
  public boolean waitVerification(long sessionID, long timeout) throws Exception {
    Identity.WaitVerificationRequest request =
        Identity.WaitVerificationRequest.newBuilder()
            .setConfigData(this.configData)
            .setSessionId(sessionID)
            .setTimeout(timeout)
            .build();

    Identity.WaitVerificationResponse response = bridge.getIdentity().waitVerification(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getStatus();
  }

  /**
   * Gets the status of a verification session on the identity managed API provided.
   * @param sessionID
   * @return
   * @throws Exception
   */
  public boolean getVerificationStatus(long sessionID) throws Exception {
    Identity.GetVerificationStatusRequest request =
        Identity.GetVerificationStatusRequest.newBuilder()
            .setConfigData(this.configData)
            .setSessionId(sessionID)
            .build();

    Identity.GetVerificationStatusResponse response =
        bridge.getIdentity().getVerificationStatus(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getStatus();
  }
}
