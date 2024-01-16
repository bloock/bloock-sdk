package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.identity_v2.*;

import java.util.List;

public class IdentityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  public IdentityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public IdentityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  public String createIdentity(IdentityKey issuerKey, DidParams didParams) throws Exception {
    IdentityV2.CreateIdentityV2Request.Builder builder = IdentityV2.CreateIdentityV2Request.newBuilder()
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

  public String createIssuer(IdentityKey issuerKey, PublishIntervalParams publishInterval, String name, String description, String image) throws Exception {
    return createIssuer(issuerKey, publishInterval, new DidParams(), name, description, image);
  }

  public String createIssuer(IdentityKey issuerKey, PublishIntervalParams publishInterval, DidParams issuerParams, String name, String description,
                             String image) throws Exception {
    IdentityV2.CreateIssuerRequest.Builder builder = IdentityV2.CreateIssuerRequest.newBuilder()
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

  public String getIssuerByKey(IdentityKey issuerKey) throws Exception {
    return getIssuerByKey(issuerKey, new DidParams());
  }

  public String getIssuerByKey(IdentityKey issuerKey, DidParams issuerParams) throws Exception {
    IdentityV2.GetIssuerByKeyRequest request = IdentityV2.GetIssuerByKeyRequest.newBuilder()
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

  public SchemaBuilder buildSchema(
      String displayName, String schemaType, String version, String description)
      throws Exception {
    return new SchemaBuilder(
        displayName, schemaType, version, description, this.configData);
  }

  public Schema getSchema(String id) throws Exception {
    IdentityV2.GetSchemaRequestV2 request = IdentityV2.GetSchemaRequestV2.newBuilder().setConfigData(this.configData)
        .setId(id).build();

    IdentityV2.GetSchemaResponseV2 response = bridge.getIdentityV2().getSchema(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Schema.fromProto(response.getSchema());
  }

  public CredentialBuilder buildCredential(
      String schemaId, String issuerDid, String holderDid, Long expiration, int version)
      throws Exception {
    return new CredentialBuilder(
        schemaId, issuerDid, holderDid, expiration, version, this.configData);
  }

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

  public CredentialProof getCredentialProof(String issuerDid, String credentialId)
      throws Exception {
    IdentityV2.GetCredentialProofRequest request = IdentityV2.GetCredentialProofRequest.newBuilder()
        .setCredentialId(credentialId)
        .setIssuerDid(issuerDid)
        .setConfigData(this.configData)
        .build();

    IdentityV2.GetCredentialProofResponse response = bridge.getIdentityV2().getCredentialProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialProof.fromProto(response.getProof());
  }

  public boolean revokeCredential(Credential credential, Signer signer) throws Exception {
    IdentityV2.RevokeCredentialRequestV2 request = IdentityV2.RevokeCredentialRequestV2.newBuilder()
        .setConfigData(this.configData)
        .setCredential(credential.toProto())
        .setSigner(signer.toProto())
        .build();

    IdentityV2.RevokeCredentialResponseV2 response = bridge.getIdentityV2().revokeCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getResult().getSuccess();
  }

  public VerificationReceipt createVerification(String proofRequest) throws Exception {
    IdentityV2.CreateVerificationRequest request = IdentityV2.CreateVerificationRequest.newBuilder()
            .setConfigData(this.configData)
            .setProofRequest(proofRequest)
            .build();

    IdentityV2.CreateVerificationResponse response = bridge.getIdentityV2().createVerification(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return VerificationReceipt.fromProto(response.getResult());
  }

  public boolean waitVerification(long sessionID, long timeout) throws Exception {
    IdentityV2.WaitVerificationRequest request = IdentityV2.WaitVerificationRequest.newBuilder()
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

  public boolean getVerificationStatus(long sessionID) throws Exception {
    IdentityV2.GetVerificationStatusRequest request = IdentityV2.GetVerificationStatusRequest.newBuilder()
            .setConfigData(this.configData)
            .setSessionId(sessionID)
            .build();

    IdentityV2.GetVerificationStatusResponse response = bridge.getIdentityV2().getVerificationStatus(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getStatus();
  }
}
