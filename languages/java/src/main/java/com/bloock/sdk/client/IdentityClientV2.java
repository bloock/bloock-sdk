package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.IdentityV2;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.identity_v2.Credential;
import com.bloock.sdk.entity.identity_v2.CredentialBuilder;
import com.bloock.sdk.entity.identity_v2.CredentialProof;
import com.bloock.sdk.entity.identity_v2.IssuerKey;
import com.bloock.sdk.entity.identity_v2.IssuerParams;
import com.bloock.sdk.entity.identity_v2.IssuerStatePublisher;
import com.bloock.sdk.entity.identity_v2.Schema;
import com.bloock.sdk.entity.identity_v2.SchemaBuilder;
import java.util.List;

public class IdentityClientV2 {
  private final Bridge bridge;
  private final ConfigData configData;
  private final String apiManagedHost;

  public IdentityClientV2(String apiManagedHost) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
    this.apiManagedHost = apiManagedHost;
  }

  public IdentityClientV2(ConfigData configData, String apiManagedHost) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
    this.apiManagedHost = apiManagedHost;
  }

  public String createIssuer(IssuerKey issuerKey) throws Exception {
    return createIssuer(issuerKey, new IssuerParams());
  }

  public String createIssuer(IssuerKey issuerKey, IssuerParams issuerParams) throws Exception {
    IdentityV2.CreateIssuerRequest request =
        IdentityV2.CreateIssuerRequest.newBuilder()
            .setIssuerKey(issuerKey.toProto())
            .setIssuerParams(issuerParams.toProto())
            .setConfigData(this.configData)
            .build();
    IdentityV2.CreateIssuerResponse response = bridge.getIdentityV2().createIssuer(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getDid();
  }

  public List<String> getIssuerList() throws Exception {
    IdentityV2.GetIssuerListRequest request =
        IdentityV2.GetIssuerListRequest.newBuilder().setConfigData(this.configData).build();

    IdentityV2.GetIssuerListResponse response = bridge.getIdentityV2().getIssuerList(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getDidList();
  }

  public String getIssuerByKey(IssuerKey issuerKey) throws Exception {
    return getIssuerByKey(issuerKey, new IssuerParams());
  }

  public String getIssuerByKey(IssuerKey issuerKey, IssuerParams issuerParams) throws Exception {
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

  public SchemaBuilder buildSchema(
      String displayName, String schemaType, String version, String description, String issuerDid)
      throws Exception {
    return new SchemaBuilder(
        displayName, schemaType, version, description, issuerDid, this.configData);
  }

  public Schema getSchema(String id) throws Exception {
    IdentityV2.GetSchemaRequestV2 request =
        IdentityV2.GetSchemaRequestV2.newBuilder().setConfigData(this.configData).setId(id).build();

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
        schemaId, issuerDid, holderDid, expiration, version, this.apiManagedHost, this.configData);
  }

  public IssuerStatePublisher buildIssuerStatePublisher(String issuerDid) throws Exception {
    return new IssuerStatePublisher(issuerDid, this.configData);
  }

  public CredentialProof getCredentialProof(String issuerDid, String credentialId)
      throws Exception {
    IdentityV2.GetCredentialProofRequest request =
        IdentityV2.GetCredentialProofRequest.newBuilder()
            .setCredentialId(credentialId)
            .setIssuerDid(credentialId)
            .setConfigData(this.configData)
            .build();

    IdentityV2.GetCredentialProofResponse response =
        bridge.getIdentityV2().getCredentialProof(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return CredentialProof.fromProto(response.getProof());
  }

  public boolean revokeCredential(Credential credential) throws Exception {
    IdentityV2.RevokeCredentialRequestV2 request =
        IdentityV2.RevokeCredentialRequestV2.newBuilder()
            .setConfigData(this.configData)
            .setCredential(credential.toProto())
            .build();

    IdentityV2.RevokeCredentialResponseV2 response =
        bridge.getIdentityV2().revokeCredential(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getResult().getSuccess();
  }
}
