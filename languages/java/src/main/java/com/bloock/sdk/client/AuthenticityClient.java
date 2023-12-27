package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Authenticity.*;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.authenticity.Signature;
import com.bloock.sdk.entity.authenticity.Signer;
import com.bloock.sdk.entity.key.EcdsaKeyPair;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.record.Record;
import java.util.List;
import java.util.stream.Collectors;

public class AuthenticityClient {
  private final Bridge bridge;
  private final ConfigData configData;

  public AuthenticityClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public AuthenticityClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
   */
  @Deprecated
  public EcdsaKeyPair generateEcdsaKeyPair() throws Exception {
    Keys.GenerateLocalKeyRequest request =
        Keys.GenerateLocalKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setKeyType(KeyType.EcP256k.toProto())
            .build();

    Keys.GenerateLocalKeyResponse response = this.bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return EcdsaKeyPair.fromProto(response);
  }

  public Signature sign(Record record, Signer signer) throws Exception {
    SignRequest request =
        SignRequest.newBuilder()
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

  public boolean verify(Record record) throws Exception {
    VerifyRequest request =
        VerifyRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(record.toProto())
            .build();
    VerifyResponse response = this.bridge.getAuthenticity().verify(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return response.getValid();
  }

  public List<Signature> getSignatures(Record record) throws Exception {
    GetSignaturesRequest req =
        GetSignaturesRequest.newBuilder()
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
