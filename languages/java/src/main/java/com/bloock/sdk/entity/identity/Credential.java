package com.bloock.sdk.entity.identity;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockIdentityEntities;
import com.bloock.sdk.bridge.proto.BloockIdentity;
import com.bloock.sdk.bridge.proto.BloockShared;
import com.bloock.sdk.config.Config;
import java.util.List;

/**
 * Represents a verifiable credential with its associated information.
 * <a href="https://www.w3.org/TR/vc-data-model-2.0/">Verifiable Credentials
 * Data Model v2.0</a>.
 */
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

  /**
   * Creates a new Credential instance with the provided details.
   * 
   * @param context
   * @param id
   * @param type
   * @param issuanceDate
   * @param expiration
   * @param credentialSubject
   * @param credentialStatus
   * @param issuer
   * @param credentialSchema
   * @param proof
   */
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

  public static Credential fromProto(BloockIdentityEntities.Credential res) {
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

  public BloockIdentityEntities.Credential toProto() {
    return BloockIdentityEntities.Credential.newBuilder()
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

  /**
   * Creates a Credential instance from a JSON string representation.
   * 
   * @param json
   * @return
   * @throws Exception
   */
  public static Credential fromJson(String json) throws Exception {
    Bridge bridge = new Bridge();

    BloockIdentity.CredentialFromJsonRequest req = BloockIdentity.CredentialFromJsonRequest.newBuilder()
        .setConfigData(Config.newConfigDataDefault())
        .setJson(json)
        .build();

    BloockIdentity.CredentialFromJsonResponse response = bridge.getIdentity().credentialFromJson(req);

    if (response.getError() != BloockShared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Credential.fromProto(response.getCredential());
  }

  /**
   * Converts the Credential instance to its JSON string representation.
   * 
   * @return
   * @throws Exception
   */
  public String toJson() throws Exception {
    Bridge bridge = new Bridge();

    com.bloock.sdk.bridge.proto.BloockIdentity.CredentialToJsonRequest req = com.bloock.sdk.bridge.proto.BloockIdentity.CredentialToJsonRequest
        .newBuilder()
        .setConfigData(Config.newConfigDataDefault())
        .setCredential(this.toProto())
        .build();

    BloockIdentity.CredentialToJsonResponse response = bridge.getIdentity().credentialToJson(req);

    if (response.getError() != BloockShared.Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getJson();
  }

  /**
   * Gets the context associated with the credential.
   * 
   * @return
   */
  public List<String> getContext() {
    return context;
  }

  /**
   * Gets the ID associated with the credential.
   * 
   * @return
   */
  public String getId() {
    return id;
  }

  /**
   * Gets the types associated with the credential.
   * 
   * @return
   */
  public List<String> getType() {
    return type;
  }

  /**
   * Gets the issuance date of the credential.
   * 
   * @return
   */
  public String getIssuanceDate() {
    return issuanceDate;
  }

  /**
   * Gets the expiration date of the credential.
   * 
   * @return
   */
  public String getExpiration() {
    return expiration;
  }

  /**
   * Gets the subject of the credential.
   * 
   * @return
   */
  public String getCredentialSubject() {
    return credentialSubject;
  }

  /**
   * Gets the status of the credential.
   * 
   * @return
   */
  public CredentialStatus getCredentialStatus() {
    return credentialStatus;
  }

  /**
   * Gets the issuer of the credential.
   * 
   * @return
   */
  public String getIssuer() {
    return issuer;
  }

  /**
   * Gets the schema associated with the credential.
   * 
   * @return
   */
  public CredentialSchema getCredentialSchema() {
    return credentialSchema;
  }

  /**
   * Gets the proof associated with the credential.
   * 
   * @return
   */
  public CredentialProof getProof() {
    return proof;
  }
}
