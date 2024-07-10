package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockAuthenticity.*;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockKeys;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.key.EcdsaKeyPair;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.record.Record;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Represents a client for interacting with the
 * <a href="https://dashboard.bloock.com/login">Bloock Authenticity service</a>.
 */
public class AuthenticityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new instance of the AuthenticityClient with default configuration.
   */
  public AuthenticityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new instance of the AuthenticityClient with the provided
   * configuration.
   * 
   * @param configData
   */
  public AuthenticityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Generates ECDSA key pair for signing records.
   * 
   * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey
   *             function instead.
   */
  @Deprecated
  public EcdsaKeyPair generateEcdsaKeyPair() throws Exception {
    BloockKeys.GenerateLocalKeyRequest request = BloockKeys.GenerateLocalKeyRequest.newBuilder()
        .setConfigData(this.configData)
        .setKeyType(KeyType.EcP256k.toProto())
        .build();

    BloockKeys.GenerateLocalKeyResponse response = this.bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return EcdsaKeyPair.fromProto(response);
  }

  /**
   * Signs a Bloock record using the specified signer.
   * 
   * @param record
   * @param signer
   * @return
   * @throws Exception
   */
  public Signature sign(Record record, Signer signer) throws Exception {
    SignRequest request = SignRequest.newBuilder()
        .setConfigData(this.configData)
        .setRecord(record.toProto())
        .setSigner(signer.toProto())
        .build();
    SignResponse response = this.bridge.getAuthenticity().sign(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Signature.fromProto(response.getSignature());
  }

  /**
   * Verifies the authenticity of a Bloock record.
   * 
   * @param record
   * @return
   * @throws Exception
   */
  public boolean verify(Record record) throws Exception {
    VerifyRequest request = VerifyRequest.newBuilder()
        .setConfigData(this.configData)
        .setRecord(record.toProto())
        .build();
    VerifyResponse response = this.bridge.getAuthenticity().verify(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getValid();
  }

  /**
   * Gets the signatures associated with a Bloock record.
   * 
   * @param record
   * @return
   * @throws Exception
   */
  public List<Signature> getSignatures(Record record) throws Exception {
    GetSignaturesRequest req = GetSignaturesRequest.newBuilder()
        .setConfigData(this.configData)
        .setRecord(record.toProto())
        .build();
    GetSignaturesResponse recordSignatures = this.bridge.getAuthenticity().getSignatures(req);

    if (recordSignatures.getError() != Error.getDefaultInstance()) {
      throw new Exception(recordSignatures.getError().getMessage());
    }

    return recordSignatures.getSignaturesList().stream()
        .map(x -> Signature.fromProto(x))
        .collect(Collectors.toList());
  }
}
