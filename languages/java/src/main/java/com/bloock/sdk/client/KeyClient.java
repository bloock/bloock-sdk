package com.bloock.sdk.client;

import com.bloock.sdk.bridge.Bridge;
import com.bloock.sdk.bridge.proto.BloockConfig.ConfigData;
import com.bloock.sdk.bridge.proto.BloockKeys;
import com.bloock.sdk.bridge.proto.BloockShared.Error;
import com.bloock.sdk.config.Config;
import com.bloock.sdk.entity.key.*;
import com.google.protobuf.ByteString;

/**
 * Provides functionality to interact with the
 * <a href="https://dashboard.bloock.com/login">Bloock Keys service</a>.
 */
public class KeyClient {
  private final Bridge bridge;
  private final ConfigData configData;

  /**
   * Creates a new KeyClient with default configuration.
   */
  public KeyClient() {
    this.bridge = new Bridge();
    this.configData = Config.newConfigDataDefault();
  }

  /**
   * Creates a new KeyClient with the given configuration.
   * 
   * @param configData
   */
  public KeyClient(ConfigData configData) {
    this.bridge = new Bridge();
    this.configData = Config.newConfigData(configData);
  }

  /**
   * Generates a new local key of the specified type.
   * 
   * @param keyType
   * @return
   * @throws Exception
   */
  public LocalKey newLocalKey(KeyType keyType) throws Exception {
    BloockKeys.GenerateLocalKeyRequest request = BloockKeys.GenerateLocalKeyRequest.newBuilder()
        .setConfigData(this.configData)
        .setKeyType(keyType.toProto())
        .build();

    BloockKeys.GenerateLocalKeyResponse response = bridge.getKey().generateLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalKey.fromProto(response.getLocalKey());
  }

  /**
   * Loads a local key of the specified type from a public key string.
   * 
   * @param keyType
   * @param key
   * @return
   * @throws Exception
   */
  public LocalKey loadLocalKey(KeyType keyType, String key) throws Exception {
    BloockKeys.LoadLocalKeyRequest request = BloockKeys.LoadLocalKeyRequest.newBuilder()
        .setConfigData(this.configData)
        .setKeyType(keyType.toProto())
        .setKey(key)
        .build();

    BloockKeys.LoadLocalKeyResponse response = bridge.getKey().loadLocalKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalKey.fromProto(response.getLocalKey());
  }

  /**
   * Generates a new managed key with the specified parameters.
   * 
   * @param params
   * @return
   * @throws Exception
   */
  public ManagedKey newManagedKey(ManagedKeyParams params) throws Exception {
    BloockKeys.GenerateManagedKeyRequest request = BloockKeys.GenerateManagedKeyRequest.newBuilder()
        .setConfigData(this.configData)
        .setParams(params.toProto())
        .build();

    BloockKeys.GenerateManagedKeyResponse response = bridge.getKey().generateManagedKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedKey.fromProto(response.getManagedKey());
  }

  /**
   * Loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
   * 
   * @param id
   * @return
   * @throws Exception
   */
  public ManagedKey loadManagedKey(String id) throws Exception {
    BloockKeys.LoadManagedKeyRequest request = BloockKeys.LoadManagedKeyRequest.newBuilder()
        .setConfigData(this.configData)
        .setId(id).build();

    BloockKeys.LoadManagedKeyResponse response = bridge.getKey().loadManagedKey(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedKey.fromProto(response.getManagedKey());
  }

  /**
   * Generates a new local certificate with the specified parameters.
   * 
   * @param params
   * @return
   * @throws Exception
   */
  public LocalCertificate newLocalCertificate(LocalCertificateParams params) throws Exception {
    BloockKeys.GenerateLocalCertificateRequest request = BloockKeys.GenerateLocalCertificateRequest.newBuilder()
        .setConfigData(this.configData)
        .setParams(params.toProto())
        .build();

    BloockKeys.GenerateLocalCertificateResponse response = bridge.getKey().generateLocalCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalCertificate.fromProto(response.getLocalCertificate());
  }

  /**
   * Loads a local certificate from a PKCS12 file.
   * 
   * @param pkcs12
   * @param password
   * @return
   * @throws Exception
   */
  public LocalCertificate loadLocalCertificate(byte[] pkcs12, String password) throws Exception {
    BloockKeys.LoadLocalCertificateRequest request = BloockKeys.LoadLocalCertificateRequest.newBuilder()
        .setConfigData(this.configData)
        .setPkcs12(ByteString.copyFrom(pkcs12))
        .setPassword(password)
        .build();

    BloockKeys.LoadLocalCertificateResponse response = bridge.getKey().loadLocalCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return LocalCertificate.fromProto(response.getLocalCertificate());
  }

  /**
   * Generates a new managed certificate with the specified parameters.
   * 
   * @param params
   * @return
   * @throws Exception
   */
  public ManagedCertificate newManagedCertificate(ManagedCertificateParams params)
      throws Exception {
    BloockKeys.GenerateManagedCertificateRequest request = BloockKeys.GenerateManagedCertificateRequest.newBuilder()
        .setConfigData(this.configData)
        .setParams(params.toProto())
        .build();

    BloockKeys.GenerateManagedCertificateResponse response = bridge.getKey().generateManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  /**
   * Loads a managed certificate by its ID (ex:
   * ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
   * 
   * @param id
   * @return
   * @throws Exception
   */
  public ManagedCertificate loadManagedCertificate(String id) throws Exception {
    BloockKeys.LoadManagedCertificateRequest request = BloockKeys.LoadManagedCertificateRequest.newBuilder()
        .setConfigData(this.configData)
        .setId(id)
        .build();

    BloockKeys.LoadManagedCertificateResponse response = bridge.getKey().loadManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  /**
   * Imports a managed certificate with the specified parameters, supported types:
   * .pem, .pfx.
   * 
   * @param type
   * @param certificate
   * @param params
   * @return
   * @throws Exception
   */
  public ManagedCertificate importManagedCertificate(
      CertificateType type, byte[] certificate, ImportCertificateParams params) throws Exception {
    BloockKeys.ImportManagedCertificateRequest.Builder builder = BloockKeys.ImportManagedCertificateRequest.newBuilder()
        .setConfigData(this.configData)
        .setCertificateType(type.toProto())
        .setCertificate(ByteString.copyFrom(certificate));

    if (params.getPassword() != null) {
      builder.setPassword(params.getPassword());
    }

    BloockKeys.ImportManagedCertificateRequest request = builder.build();

    BloockKeys.ImportManagedCertificateResponse response = bridge.getKey().importManagedCertificate(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return ManagedCertificate.fromProto(response.getManagedCertificate());
  }

  /**
   * Sets up TOTP-based access control for the given managed key or managed
   * certificate.
   * 
   * @param key
   * @return
   * @throws Exception
   */
  public TotpAccessControlReceipt setupTotpAccessControl(Managed key) throws Exception {
    BloockKeys.SetupTotpAccessControlRequest.Builder builder = BloockKeys.SetupTotpAccessControlRequest.newBuilder()
        .setConfigData(this.configData);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    BloockKeys.SetupTotpAccessControlRequest request = builder.build();

    BloockKeys.SetupTotpAccessControlResponse response = bridge.getKey().setupTotpAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new TotpAccessControlReceipt(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  /**
   * Recovers TOTP-based access control for the given managed key or managed
   * certificate using a recovery code.
   * 
   * @param key
   * @param code
   * @return
   * @throws Exception
   */
  public TotpAccessControlReceipt recoverTotpAccessControl(Managed key, String code) throws Exception {
    BloockKeys.RecoverTotpAccessControlRequest.Builder builder = BloockKeys.RecoverTotpAccessControlRequest.newBuilder()
        .setConfigData(this.configData)
        .setCode(code);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    BloockKeys.RecoverTotpAccessControlRequest request = builder.build();

    BloockKeys.RecoverTotpAccessControlResponse response = bridge.getKey().recoverTotpAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }

    return new TotpAccessControlReceipt(
        response.getSecret(), response.getSecretQr(), response.getRecoveryCodesList());
  }

  /**
   * Sets up secret-based access control for the given managed key or managed
   * certificate.
   * 
   * @param key
   * @param secret
   * @param email
   * @throws Exception
   */
  public void setupSecretAccessControl(Managed key, String secret, String email) throws Exception {
    BloockKeys.SetupSecretAccessControlRequest.Builder builder = BloockKeys.SetupSecretAccessControlRequest.newBuilder()
        .setConfigData(this.configData)
        .setSecret(secret)
        .setEmail(email);

    if (key.getManagedKey() != null) {
      builder.setManagedKey(key.getManagedKey().toProto());
    }

    if (key.getManagedCertificate() != null) {
      builder.setManagedCertificate(key.getManagedCertificate().toProto());
    }

    BloockKeys.SetupSecretAccessControlRequest request = builder.build();

    BloockKeys.SetupSecretAccessControlResponse response = bridge.getKey().setupSecretAccessControl(request);

    if (response.getError() != Error.getDefaultInstance()) {
      throw new Exception(response.getError().getMessage());
    }
  }
}
