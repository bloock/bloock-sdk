package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.Config.ConfigData;
import com.bloock.sdk.bridge.proto.Encryption;
import com.bloock.sdk.bridge.proto.Encryption.EncryptionAlgRequest;
import com.bloock.sdk.bridge.proto.Encryption.EncryptionAlgResponse;
import com.bloock.sdk.bridge.proto.Keys;
import com.bloock.sdk.bridge.proto.Shared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.encryption.Encrypter;
import com.bloock.sdk.entity.encryption.EncryptionAlg;
import com.bloock.sdk.entity.key.KeyType;
import com.bloock.sdk.entity.key.RsaKeyPair;
import com.bloock.sdk.entity.record.Record;

/**
 * Represents a client for interacting with the <a href="https://dashboard.bloock.com/login">Bloock Encryption service</a>.
 */
public class EncryptionClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new instance of the EncryptionClient with default configuration.
   */
  public EncryptionClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new instance of the EncryptionClient with the provided configuration.
   * @param configData
   */
  public EncryptionClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * GenerateRsaKeyPair generates an RSA key pair for encryption.
   * @deprecated Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
   */
  @Deprecated
  public RsaKeyPair generateRsaKeyPair() throws Exception {
    Keys.GenerateLocalKeyRequest request =
        Keys.GenerateLocalKeyRequest.newBuilder()
            .setConfigData(this.configData)
            .setKeyType(KeyType.Rsa2048.toProto())
            .build();

    Keys.GenerateLocalKeyResponse response = bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return RsaKeyPair.fromProto(response);
  }

  /**
   * Encrypts a Bloock record using the specified encrypter.
   * @param record
   * @param encrypter
   * @return
   * @throws Exception
   */
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

  /**
   * Decrypts a Bloock record using the specified decrypter.
   * @param record
   * @param decrypter
   * @return
   * @throws Exception
   */
  public Record decrypt(Record record, Encrypter decrypter) throws Exception {
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

  /**
   * Gets the encryption algorithm used for a Bloock record.
   * @param record
   * @return
   * @throws Exception
   */
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
