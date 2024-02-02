package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.identity_v2.*;

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
   * Creates a new identity.
   * @param issuerKey
   * @param didParams
   * @return
   * @throws Exception
   */
  public String createIdentity(IdentityKey issuerKey, DidParams didParams) throws Exception {
    IdentityV2.CreateIdentityV2Request.Builder builder =
        IdentityV2.CreateIdentityV2Request.newBuilder()
            .setIssuerKey(issuerKey.toProto())
            .setDidParams(didParams.toProto())
            .setConfigData(this.configData);

    IdentityV2.CreateIdentityV2Request request = builder.build();

    IdentityV2.CreateIdentityV2Response response = bridge.getIdentityV2().createIdentity(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getDid();
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
  public String createIssuer(
      IdentityKey issuerKey,
      PublishIntervalParams publishInterval,
      String name,
      String description,
      String image)
      throws Exception {
    return createIssuer(issuerKey, publishInterval, new DidParams(), name, description, image);
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
  public String createIssuer(
      IdentityKey issuerKey,
      PublishIntervalParams publishInterval,
      DidParams issuerParams,
      String name,
      String description,
      String image)
      throws Exception {
    IdentityV2.CreateIssuerRequest.Builder builder =
        IdentityV2.CreateIssuerRequest.newBuilder()
            .setIssuerKey(issuerKey.toProto())
            .setIssuerParams(issuerParams.toProto())
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

    IdentityV2.CreateIssuerRequest request = builder.build();

    IdentityV2.CreateIssuerResponse response = bridge.getIdentityV2().createIssuer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getDid();
  }

  /**
   * Gets the DID of an issuer based on the issuer key.
   * @param issuerKey
   * @return
   * @throws Exception
   */
  public String getIssuerByKey(IdentityKey issuerKey) throws Exception {
    return getIssuerByKey(issuerKey, new DidParams());
  }

  /**
   * Gets the DID of an issuer based on the issuer key and DID parameters.
   * @param issuerKey
   * @param issuerParams
   * @return
   * @throws Exception
   */
  public String getIssuerByKey(IdentityKey issuerKey, DidParams issuerParams) throws Exception {
    IdentityV2.GetIssuerByKeyRequest request =
        IdentityV2.GetIssuerByKeyRequest.newBuilder()
            .setIssuerKey(issuerKey.toProto())
            .setIssuerParams(issuerParams.toProto())
            .setConfigData(this.configData)
            .build();

    IdentityV2.GetIssuerByKeyResponse response = bridge.getIdentityV2().getIssuerByKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getDid();
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
    IdentityV2.GetSchemaRequestV2 request =
        IdentityV2.GetSchemaRequestV2.newBuilder().setConfigData(this.configData).setId(id).build();

    IdentityV2.GetSchemaResponseV2 response = bridge.getIdentityV2().getSchema(request);

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
      String schemaId, String issuerDid, String holderDid, Long expiration, int version)
      throws Exception {
    return new CredentialBuilder(
        schemaId, issuerDid, holderDid, expiration, version, this.configData);
  }

  /**
   * Publishes the state of an issuer on the Bloock Identity service.
   * @param issuerDid
   * @param signer
   * @return
   * @throws Exception
   */
  public IssuerStateReceipt publishIssuerState(String issuerDid, Signer signer) throws Exception {
    IdentityV2.PublishIssuerStateRequest req =
        IdentityV2.PublishIssuerStateRequest.newBuilder()
            .setConfigData(this.configData)
            .setIssuerDid(issuerDid)
            .setSigner(signer.toProto())
            .build();

    IdentityV2.PublishIssuerStateResponse response = bridge.getIdentityV2().publishIssuerState(req);

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
    IdentityV2.GetCredentialProofRequest request =
        IdentityV2.GetCredentialProofRequest.newBuilder()
            .setCredentialId(credentialId)
            .setIssuerDid(issuerDid)
            .setConfigData(this.configData)
            .build();

    IdentityV2.GetCredentialProofResponse response =
        bridge.getIdentityV2().getCredentialProof(request);

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
  public boolean revokeCredential(Credential credential, Signer signer) throws Exception {
    IdentityV2.RevokeCredentialRequestV2 request =
        IdentityV2.RevokeCredentialRequestV2.newBuilder()
            .setConfigData(this.configData)
            .setCredential(credential.toProto())
            .setSigner(signer.toProto())
            .build();

    IdentityV2.RevokeCredentialResponseV2 response =
        bridge.getIdentityV2().revokeCredential(request);

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
    IdentityV2.CreateVerificationRequest request =
        IdentityV2.CreateVerificationRequest.newBuilder()
            .setConfigData(this.configData)
            .setProofRequest(proofRequest)
            .build();

    IdentityV2.CreateVerificationResponse response =
        bridge.getIdentityV2().createVerification(request);

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
    IdentityV2.WaitVerificationRequest request =
        IdentityV2.WaitVerificationRequest.newBuilder()
            .setConfigData(this.configData)
            .setSessionId(sessionID)
            .setTimeout(timeout)
            .build();

    IdentityV2.WaitVerificationResponse response = bridge.getIdentityV2().waitVerification(request);

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
    IdentityV2.GetVerificationStatusRequest request =
        IdentityV2.GetVerificationStatusRequest.newBuilder()
            .setConfigData(this.configData)
            .setSessionId(sessionID)
            .build();

    IdentityV2.GetVerificationStatusResponse response =
        bridge.getIdentityV2().getVerificationStatus(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getStatus();
  }
}
