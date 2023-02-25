package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Encryption;
import com.bloock.sdk.bridge.proto.Encryption.EncryptionAlgRequest;
import com.bloock.sdk.bridge.proto.Encryption.EncryptionAlgResponse;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.RsaKeyPair;
import com.bloock.sdk.entity.record.Record;
import com.bloock.sdk.entity.encryption.Decrypter;
import com.bloock.sdk.entity.encryption.Encrypter;
import com.bloock.sdk.entity.encryption.EncryptionAlg;

public class EncryptionClient {
  private Bridge bridge;
  private ConfigData configData;

  public EncryptionClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  public EncryptionClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * @deprecated
   * Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
   */
  @Deprecated(forRemoval = true)
  public RsaKeyPair generateRsaKeyPair() throws Exception {
    Keys.GenerateLocalKeyRequest request = Keys.GenerateLocalKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setKeyType(KeyType.Rsa2048.toProto())
            .build();

    Keys.GenerateLocalKeyResponse response = bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return RsaKeyPair.fromProto(response);
  }

  public Record encrypt(Record record, Encrypter encrypter) throws Exception {
    Encryption.EncryptRequest request =
        Encryption.EncryptRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(record.toProto())
            .setEncrypter(encrypter.toProto())
            .build();

    Encryption.EncryptResponse response = bridge.getEncryption().encrypt(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Record.fromProto(response.getRecord(), this.configData);
  }

  public Record decrypt(Record record, Decrypter decrypter) throws Exception {
    Encryption.DecryptRequest request =
        Encryption.DecryptRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(record.toProto())
            .setDecrypter(decrypter.toProto())
            .build();

    Encryption.DecryptResponse response = bridge.getEncryption().decrypt(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return Record.fromProto(response.getRecord(), this.configData);
  }

  public EncryptionAlg getEncryptionAlg(Record record) throws Exception {
    Bridge bridge = new Bridge();

    EncryptionAlgRequest req =
        EncryptionAlgRequest.newBuilder()
            .setConfigData(this.configData)
            .setRecord(record.toProto())
            .build();
    EncryptionAlgResponse res = bridge.getEncryption().getEncryptionAlg(req);

    if (res.getError() != Error.getDefaultInstance()) {
      throw new Exception(res.getError().getMessage());
    }

    return EncryptionAlg.fromProto(res.getAlg());
  }
}
